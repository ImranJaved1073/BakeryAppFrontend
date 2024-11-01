import { useParams, useHistory } from 'react-router-dom';
import useFetch from '../useFetch';
import { useState } from 'react';
import Cookies from 'js-cookie'; // Import js-cookie

const ProductDetails = () => {
    const { id } = useParams();
    const { data: product, isPending, error } = useFetch('http://localhost:8000/products/' + id);
    const history = useHistory();
    const [cartMessage, setCartMessage] = useState('');

    // Handle add to cart functionality using js-cookie
    const addToCart = () => {
        // Get the existing cart from cookies
        let cart = Cookies.get('cart');
        cart = cart ? JSON.parse(cart) : [];

        // Check if the product is already in the cart
        const productExists = cart.find(item => item.id === product.id);

        if (!productExists) {
            // Add the product to the cart
            cart.push({ ...product, quantity: 1 });

            // Save the updated cart back to cookies using js-cookie
            Cookies.set('cart', JSON.stringify(cart), { expires: 7 }); // Store cart in cookies for 7 days

            // Show success message
            setCartMessage('Product added to cart!');
            // Dispatch an event to update the Navbar
            window.dispatchEvent(new Event('cartUpdated'));
        } else {
            setCartMessage('Product is already in the cart.');
        }

        // Clear the message after 3 seconds
        setTimeout(() => setCartMessage(''), 3000);
    };

    return (
        <div className="ProductDetails mb-5">
            <h1 className="mx-5">Details</h1>
            <div className="container my-5">
                {isPending && <div className="text-center">Loading...</div>}
                {error && <div className="alert alert-danger">{error}</div>}
                {product && (
                    <div className="product-details card shadow-lg">
                        <div className="row">
                            {/* Product Image */}
                            <div className="col-md-6">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="img-fluid rounded shadow-sm product-image"
                                />
                            </div>

                            {/* Product Information */}
                            <div className="col-md-6">
                                <h1 className="product-title mb-4">{product.name}</h1>
                                <p className="text-muted">{product.category}</p>
                                <hr />
                                <p><strong>Description: </strong>{product.description}</p>

                                {/* Ingredients */}
                                <p>
                                    <strong>Ingredients: </strong>
                                    {product.ingredients.join(', ')}
                                </p>

                                {/* Price and Availability */}
                                <p className="product-price">
                                    <strong>Price: </strong>${product.price}
                                </p>
                                <p className={`availability-status ${product.availability ? 'text-success' : 'text-danger'}`}>
                                    <strong>Availability: </strong>
                                    {product.availability ? 'In Stock' : 'Out of Stock'}
                                </p>

                                {/* Stock */}
                                <p className="stock-info">
                                    <strong>Stock: </strong>{product.stock} units available
                                </p>

                                {/* Add to Cart Button */}
                                <button
                                    className="btn text-white btn-lg add-to-cart-button mt-4"
                                    onClick={addToCart}
                                    disabled={!product.availability}
                                >
                                    {product.availability ? 'Add to Cart' : 'Out of Stock'}
                                </button>

                                {/* Cart Message */}
                                {cartMessage && <div className="alert alert-info mt-3">{cartMessage}</div>}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductDetails;
