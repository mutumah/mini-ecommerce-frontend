import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { listAllProducts } from '../redux/slices/productSlice';
import Product from '../components/Product';
import './Products.css';

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // ✅ Add this
  const { products, loading, error } = useSelector((state) => state.products);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedCategory = queryParams.get('category');

  useEffect(() => {
    dispatch(listAllProducts());
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedCategory]);

  // Filter products by category
  const filteredProducts = selectedCategory
    ? products.filter(
        (product) =>
          product.category?.toLowerCase() === selectedCategory.toLowerCase()
      )
    : products;

  return (
    <div className="products-container">
      <div className="products-page">
        <h2 className="products-title">
          🛍️ {selectedCategory ? `Category: ${selectedCategory}` : 'All Products'}
        </h2>

        {/* ✅ Working Dropdown Filter */}
        <div className="category-filter">
          <label htmlFor="category-select">Filter by Category:</label>
          <select
            id="category-select"
            value={selectedCategory || ''}
            onChange={(e) => {
              const selected = e.target.value;
              navigate(selected ? `/products?category=${selected}` : '/products');
            }}
          >
            <option value="">All</option>
            <option value="clothing">Clothing</option>
            <option value="electronics">Electronics</option>
            <option value="home">Home</option>
            <option value="kitchen">Kitchen</option>
          </select>
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner">Loading products...</div>
          </div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <div className="product-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Product key={product._id} product={product} />
              ))
            ) : (
              <p className="error-message">No products found in this category.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
