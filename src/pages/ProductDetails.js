import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import API from "../utils/api";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
  const fetchProduct = async () => {
    try {
      const res = await API.get(`/api/products/${id}`);
      const data = res.data;
      setProduct(data);
    } catch (err) {
      setError("Failed to fetch product");
    } finally {
      setLoading(false);
    }
  };
  fetchProduct();
}, [id]);


  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2500);
  };

  const incrementQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;


// Use the backend URL from environment variables
const backendBaseUrl = process.env.REACT_APP_API_URL?.replace(/\/$/, ""); // remove trailing slash if any

const imageSrc = product?.imageUrl
  ? product.imageUrl.startsWith("http")
    ? product.imageUrl
    : `${backendBaseUrl}${product.imageUrl}`
  : "/images/placeholder.jpg";

console.log("Resolved image URL:", imageSrc);

return (
  <div className="product-details-container">
    <div className="product-details-content">
      <div className="product-details-image">
        <img
          src={imageSrc}
          alt={product.name}
          crossOrigin="anonymous"
          onError={(e) => {
            e.target.src = "/images/placeholder.jpg";
          }}
        />
      </div>

        <div className="product-details-info">
          {success && <div className="success-message">Added to Cart! 🛒</div>}

          <h2>{product.name}</h2>
          <h3 className="price">${product.price.toFixed(2)}</h3>
          <p className="description">{product.description}</p>
          <p className="stock">
            {product.stock > 0 ? `In Stock: ${product.stock}` : "Out of Stock"}
          </p>

          {product.stock > 0 && (
            <div className="quantity-selector">
              <button onClick={decrementQuantity} className="qty-btn">-</button>
              <span className="quantity bounce">{quantity}</span>
              <button onClick={incrementQuantity} className="qty-btn">+</button>
            </div>
          )}

          <button
            className={`add-to-cart-btn ${product.stock === 0 ? "disabled" : ""}`}
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            {product.stock > 0 ? "Add to Cart 🛒" : "Out of Stock 🚫"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
