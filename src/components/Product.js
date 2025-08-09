import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import './Product.css';

const Product = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity: 1 }));
  };
  const imageSrc = product.imageUrl || "/images/placeholder.png";
  return (
    <div className="product-card" data-aos="fade-up">
      <img
        src={imageSrc}
        alt={product.name}
        onError={(e) => { e.target.src = "/images/placeholder.png"; }}
      />
      <h3>{product.name}</h3>
      <p>${product.price.toFixed(2)}</p>
      <div className="product-actions">
        <Link to={`/products/${product._id}`}>
          <button className="view-btn">View</button>
        </Link>
        <button className="add-btn" onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
};

export default Product;
