import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import './Product.css';

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false); // Track when image has loaded

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  // ✅ Get backend base URL from environment variable
  const backendBaseUrl = process.env.REACT_APP_API_URL?.replace(/\/$/, "");

  // ✅ Fix image path handling
  const imageSrc = product?.imageUrl
    ? product.imageUrl.startsWith("http")
      ? product.imageUrl
      : `${backendBaseUrl}${product.imageUrl}`
    : "/images/placeholder.png";

  return (
    <div className="product-card" data-aos="fade-up">
      <div className="image-wrapper">
        {!loaded && <div className="image-placeholder">Loading...</div>}
        <img
          src={imageSrc}
          alt={product.name}
          crossOrigin="anonymous"
          loading="lazy" // Lazy load
          onLoad={() => setLoaded(true)}
          onError={(e) => { e.target.src = "/images/placeholder.png"; }}
          style={{
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out'
          }}
        />
      </div>
      <h3>{product.name}</h3>
      <p>${product.price.toFixed(2)}</p>
      <div className="product-actions">
        <Link to={`/products/${product._id}`}>
          <button className="view-btn">View</button>
        </Link>
        <button className="add-btn" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Product;
