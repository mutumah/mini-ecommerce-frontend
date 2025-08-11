import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity
} from '../redux/slices/cartSlice';
import './Cart.css';

const Cart = () => {
  const { cartItems, totalQuantity, totalPrice } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="cart-page-wrapper">
      <div className="cart-container">
        <h2 className="cart-title">🛒 Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <p className="empty-cart">Your cart is empty.</p>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item._id} className="cart-item">
                  <div className="cart-item-info">
                    <h4>{item.name}</h4>
                    <p>${item.price.toFixed(2)}</p>
                  </div>
                  <div className="cart-item-qty">
                    <button onClick={() => dispatch(decreaseQuantity(item._id))} disabled={item.quantity === 1}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => dispatch(increaseQuantity(item._id))}>+</button>
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() => dispatch(removeFromCart(item._id))}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h3>Total Items: {totalQuantity}</h3>
              <h3>Total Price: ${totalPrice.toFixed(2)}</h3>

              <div className="cart-actions">
                <button
                  className="clear-cart"
                  onClick={() => dispatch(clearCart())}
                  disabled={cartItems.length === 0}
                >
                  Clear Cart
                </button>

                <button
                  className="checkout-btn"
                  onClick={() => navigate('/checkout')}
                  disabled={cartItems.length === 0}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
