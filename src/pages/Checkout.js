import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/slices/cartSlice";
import "./Checkout.css";

const API_BASE_URL = process.env.REACT_APP_API_URL;

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    paymentMethod: "Card",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateZip = (zip) => /^\d{5}(-\d{4})?$/.test(zip);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!validateZip(formData.zip)) {
      alert("Please enter a valid ZIP code");
      setIsSubmitting(false);
      return;
    }

    try {
      const token = sessionStorage.getItem("token");

      const orderPayload = {
        items: cart.cartItems.map((item) => ({
          product: item._id || item.id,
          quantity: item.quantity,
          price: item.price,
        })),
        totalAmount: cart.totalPrice,
        shippingInfo: {
          fullName: formData.fullName,
          address: formData.address,
          city: formData.city,
          zip: formData.zip,
          country: "USA",
        },
      };

      const res = await fetch(`${API_BASE_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderPayload),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to place order");
      }

      const data = await res.json();
      console.log("✅ Order saved to DB:", data);

      alert("🎉 Order placed successfully!");
      dispatch(clearCart());
      navigate("/Products");
    } catch (error) {
      console.error("❌ Order submission error:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      <div className="order-summary">
        <h3>Order Summary</h3>
        {cart.cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>
            {cart.cartItems.map((item) => (
              <li key={item.id}>
                {item.name} - ${item.price} x {item.quantity}
              </li>
            ))}
          </ul>
        )}
        <h3>Total Price: ${cart.totalPrice.toFixed(2)}</h3>
      </div>

      <form onSubmit={handleSubmit} className="checkout-form">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="zip"
          placeholder="ZIP Code"
          value={formData.zip}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
          pattern="[0-9]{10}"
        />
        <select
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
        >
          <option value="Card">Credit/Debit Card</option>
          <option value="COD">Cash on Delivery</option>
        </select>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Processing..." : "Place Order"}
        </button>
      </form>
    </div>
  );
};

export default Checkout;
