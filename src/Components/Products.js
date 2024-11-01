import React, { useEffect, useState, useRef } from 'react';
import ProductsList from './ProductsList';
import Cookies from 'js-cookie'; // Import js-cookie

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);  // For loading state
  const [error, setError] = useState(null);      // For error state
  const [cartMessage, setCartMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const searchInputRef = useRef(null);

  useEffect(() => {
    const abortCont = new AbortController();

    fetch('http://localhost:8000/products', { signal: abortCont.signal })
      .then(response => {
        if (!response.ok) {
          throw new Error('Could not fetch the data for that resource');
        }
        return response.json();
      })
      .then(data => {
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false); // Data fetched successfully
        setError(null);   // Reset error state
      })
      .catch(error => {
        if (error.name === 'AbortError') {
          console.log('fetch aborted');
        } else {
          setError(error.message);
          setLoading(false); // Stop loading on error
        }
      });

    return () => abortCont.abort();
  }, []);

  const filterByCategory = (category) => {
    if (category === 'All') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => product.category === category);
      setFilteredProducts(filtered);
    }
  };

  const filterByAvailability = () => {
    const availableProducts = products.filter(product => product.availability === true);
    setFilteredProducts(availableProducts);
  };

  const addToCart = (product) => {
    let cart = Cookies.get('cart');
    cart = cart ? JSON.parse(cart) : [];

    const productExists = cart.find(item => item.id === product.id);

    if (!productExists) {
      cart.push({ ...product, quantity: 1 });
      Cookies.set('cart', JSON.stringify(cart), { expires: 7 });
      setCartMessage('Product added to cart!');
      window.dispatchEvent(new Event('cartUpdated'));
    } else {
      setCartMessage('Product is already in the cart.');
    }

    setTimeout(() => setCartMessage(''), 3000);
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm)
    );
    setFilteredProducts(filtered);
  };

  // Use useEffect to refocus after each render
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [filteredProducts]);  // Refocus after filteredProducts changes

  // Handle alert for cartMessage
  useEffect(() => {
    if (cartMessage) {
      alert(cartMessage);
      // Clear the message after alert is shown
      setCartMessage('');
    }
  }, [cartMessage]);

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="productList">
        <h1 className="mx-5">Our Products</h1>
        <div className="container">
          <div className="search-container d-flex justify-content-end align-items-center mt-5">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search Products by name......"
              value={searchTerm}
              onChange={handleSearch}
              className="search-bar"
            />
          </div>
          <div className="no-products-container mx-auto mb-5 mt-5">
            <h2 className='text-center'>
              No products Found!!
            </h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="productList">
      <div>
        <h1 className="mx-5">Our Products</h1>
        <div className="container">
          <div className="search-container mt-5">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search Products by name......"
              value={searchTerm}
              onChange={handleSearch}
              className="search-bar"
            />
          </div>
          <div className="mx-3 filter-buttons mt-5">
            <button onClick={() => filterByCategory('All')}>All</button>
            <button onClick={() => filterByCategory('Cake')}>Cakes</button>
            <button onClick={() => filterByCategory('Pastry')}>Pastries</button>
            <button onClick={() => filterByCategory('Cookie')}>Cookies</button>
            <button onClick={filterByAvailability}>Available Products</button>
          </div>

          <ProductsList products={filteredProducts} setProducts={setProducts} setFilteredProducts={setFilteredProducts} addToCart={addToCart} />
        </div>
      </div>
    </div>
  );
};

export default Products;
