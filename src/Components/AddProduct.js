import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const AddProduct = () => {

  const [isPending, setIsPending] = useState(false);
  const history = useHistory();

  const [product, setProduct] = useState({
    name: '',
    image: '',
    description: '',
    ingredients: [],
    price: '',
    availability: true,
    stock: '',
    category: ''
  });

  const [ingredient, setIngredient] = useState(''); // For adding ingredients

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleAddIngredient = () => {
    if (ingredient.trim()) {
      setProduct({
        ...product,
        ingredients: [...product.ingredients, ingredient],
      });
      setIngredient(''); // Reset input after adding
    }
  };

  const handleRemoveIngredient = (indexToRemove) => {
    const updatedIngredients = product.ingredients.filter((_, index) => index !== indexToRemove);
    setProduct({
      ...product,
      ingredients: updatedIngredients,
    });
  };

  const addProduct = (e) => {

    e.preventDefault();
    setIsPending(true);

    fetch('http://localhost:8000/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Product added:', data);
        setIsPending(false);
        setProduct({
          name: '',
          image: '',
          description: '',
          ingredients: [],
          price: '',
          stock: '',
          category: ''
        });
        // Redirect to the products page
        history.push('/products');
      })
      .catch(error => {
        setIsPending(false); // Reset loading state on error
        console.error('Error adding product:', error);
        alert(`Error adding product: ${error.message}`); // Notify user about the error
      });
  };

  return (
    <div className="AddProduct">
      <h1 className="mx-5">Add New Product</h1>
      <div className="container my-5 shadow">
        <form className="row g-3">
          <div className="col-md-6">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={product.name}
              onChange={handleChange}
              placeholder="Enter product name"
              required
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="image" className="form-label">Image URL</label>
            <input
              type="text"
              className="form-control"
              name="image"
              value={product.image}
              onChange={handleChange}
              placeholder="Enter image URL"
              required
            />
          </div>

          <div className="col-md-12">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              className="form-control"
              name="description"
              value={product.description}
              onChange={handleChange}
              placeholder="Enter product description"
              rows="4"
              required
            />
          </div>

          <div className="col-md-12">
            <label className="form-label">Ingredients</label>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                value={ingredient}
                onChange={(e) => setIngredient(e.target.value)}
                placeholder="Enter ingredient"
                required
              />
              <button
                className="btn btn-outline-success"
                type="button"
                onClick={handleAddIngredient}
              >
                Add
              </button>
            </div>
            <div>
              {product.ingredients.map((ing, index) => (
                <span key={index} className="badge me-2 mb-2" style={{ fontSize: '1rem' }}>
                  {ing} <span style={{ cursor: 'pointer' }} onClick={() => handleRemoveIngredient(index)}>&times;</span>
                </span>
              ))}
            </div>
          </div>

          <div className="col-md-4">
            <label htmlFor="price" className="form-label">Price ($)</label>
            <input
              type="number"
              className="form-control"
              name="price"
              value={product.price}
              onChange={handleChange}
              placeholder="Enter price"
              required
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="stock" className="form-label">Stock</label>
            <input
              type="number"
              className="form-control"
              name="stock"
              value={product.stock}
              onChange={handleChange}
              placeholder="Enter stock"
              required
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="category" className="form-label">Category</label>
            <select
              className="form-control"
              name="category"
              value={product.category}
              onChange={handleChange}
              required
            >
              <option value="">Select category</option>
              <option value="Cake">Cake</option>
              <option value="Pastry">Pastry</option>
              <option value="Cookie">Cookie</option>
            </select>
          </div>

          <div className="col-12">
            {!isPending &&
              <button
                type="button"
                className="btn btn-success w-100 mt-3"
                onClick={addProduct}
              >
                Add Product
              </button>
            }
            {isPending &&
              <button
                type="button"
                className="btn btn-success w-100 mt-3"
                disabled
              >
                Adding Product...
              </button>
            }
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
