import { Link } from "react-router-dom/cjs/react-router-dom.min";

const ProductsList = ({ products, setProducts, setFilteredProducts, addToCart }) => {

    const handleDelete = (id) => {
        fetch('http://localhost:8000/products/' + id, {
            method: 'DELETE'
        }).then(() => {
            console.log('Product deleted');
            return fetch('http://localhost:8000/products');
        }).then(response => response.json())
            .then(data => {
                setProducts(data);
                setFilteredProducts(data);
            })
            .catch(error => console.error('Error deleting product:', error));
    }


    return (
        <div className="product-list mt-5">
            <div className="container">
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-5">
                    {products.map(product => (
                        <div className="col" key={product.id}>
                            <div
                                className="card h-100 border-3 p-1 shadow"
                                style={{ borderColor: '#4D3621', transition: 'border-color 0.3s ease, transform 0.3s ease' }}
                                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                data-aos="fade-up"
                                data-aos-delay="200"
                            >
                                <Link to={`/products/productDetails/${product.id}`}>
                                    <img src={product.image} alt={product.name} className="card-img-top" />
                                </Link>
                                <div className="top-border" style={{ borderTop: '3px solid #4D3621', marginTop: '4px' }}></div>
                                <div className="card-body">
                                    <h4 className="card-title text-center mb-3">
                                        {product.name}
                                    </h4>
                                    <p className="card-text text-secondary mb-0">Price: ${product.price}</p>
                                    <p className="card-text text-secondary">Status: {product.availability ? 'Available' : 'Out of Stock'}</p>
                                </div>
                                <div className="card-footer d-flex justify-content-between">
                                    <div className="mybtns">
                                        <Link type="button" className="btn text-white" style={{ backgroundColor: '#4D3621' }} to={`/products/productDetails/${product.id}`}>
                                            View Details
                                        </Link>
                                        <button
                                            type="button"
                                            className="addToCartBtn btn text-white"
                                            onClick={() => addToCart(product)}
                                            disabled={!product.availability}
                                            style={{ backgroundColor: '#237a37' }}
                                        >
                                            {product.availability ? 'Add to Cart' : 'Out of Stock'}
                                        </button>
                                    </div>

                                    
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProductsList;
