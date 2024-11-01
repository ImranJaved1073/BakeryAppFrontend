import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Cookies from 'js-cookie';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    let cart = Cookies.get('cart');
    cart = cart ? JSON.parse(cart) : [];
    setCartItems(cart);
  }, []);

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const removeItemFromCart = (itemId) => {
    const updatedCart = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedCart);
    Cookies.set('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  return (
    <div className="Cart">
      <h1 className="mx-5">Your Shopping Cart</h1>
      <div className="container my-5">
        {cartItems.length > 0 ? (
          <div className="row">
            {cartItems.map(item => (
              <div key={item.id} className="col-lg-6 my-3">
                <div className="cart-item d-flex align-items-center p-3 border rounded shadow-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-image"
                    style={{ objectFit: 'cover', borderRadius: '8px' }}
                  />
                  <div className="flex-grow-1">
                    <h5 className="cart-item-title">{item.name}</h5>
                    <p className="cart-item-price">Price: <span>${item.price}</span></p>
                    <p className="cart-item-quantity">Quantity: <span>{item.quantity}</span></p>
                    <p className="cart-item-subtotal">Subtotal: <span>${(item.price * item.quantity).toFixed(2)}</span></p>
                  </div>
                  <button className="btn btn-danger remove-btn" onClick={() => removeItemFromCart(item.id)}>Remove</button>
                </div>
              </div>
            ))}

            <div className="total-price-container text-center p-4 rounded w-100 mt-4">
              <h4 className="text-success">Total: ${calculateTotalPrice()}</h4>
            </div>

            <div className='d-flex justify-content-center'>
              <Link to="/products" className="btn continueShoppingBtn mt-3 px-sm-5 py-2">Continue Shopping</Link>
            </div>
          </div>
        ) : (
          <div className="empty-cart text-center">
            <p>Your cart is currently empty.</p>
            <div className='d-flex justify-content-center'>
              <Link to="/products" className="btn continueShoppingBtn mt-3 px-sm-5 py-2">Continue Shopping</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
