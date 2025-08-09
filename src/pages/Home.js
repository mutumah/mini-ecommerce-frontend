import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'; // Add useNavigate
import { listFeaturedProducts } from '../redux/slices/productSlice';
import Product from '../components/Product';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Home.css';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Add navigation hook
  const { featuredProducts, loading, error } = useSelector((state) => state.products);

  // Add handler function
  const handleShopNow = () => {
    navigate('/products');
  };

  useEffect(() => {
    // Add home-page class to the body for homepage-specific styling
    document.body.classList.add('home-page');
    
    AOS.init({
      duration: 800,
      once: true,
      offset: 50,
    });

    dispatch(listFeaturedProducts());

    return () => {
      document.body.classList.remove('home-page');
    };
  }, [dispatch]);

  return (
    <div className="home-container">
      <section className="hero-section" data-aos="fade-up">
        <h1>Welcome to Cliff's Mini E-Commerce Store</h1>
        <p>Discover our latest products and best deals with our exclusive collection!</p>
        <button onClick={handleShopNow} className="shop-btn">
          🛍️ Shop Now
        </button>
      </section>

      <section className="categories">
        <h2 className="section-title">Shop by Category</h2>
        <div className="category-list">
          {[
            { name: 'Clothing', icon: '👕', path: '/products?category=clothing' },
            { name: 'Electronics', icon: '📱', path: '/products?category=electronics' },
            { name: 'Home', icon: '🏠', path: '/products?category=home' },
            { name: 'Kitchen', icon: '🍽️', path: '/products?category=kitchen' },
          ].map((category) => (
            <Link key={category.name} to={category.path} className="category-card">
              <div className="category-icon">{category.icon}</div>
              <div className="category-name">{category.name}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="featured-section">
        <h2 className="section-title" data-aos="fade-up">Featured Products</h2>
        {loading ? (
          <div className="loading-spinner">Loading...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <>
            <div className="featured-grid" data-aos="fade-up">
              {featuredProducts?.length > 0 ? (
                featuredProducts.slice(0, 4).map((product) => (
                  <Product
                    key={product._id}
                    product={product}
                    className="product-card"
                  />
                ))
              ) : (
                <p className="no-products">No featured products available.</p>
              )}
            </div>

            <div className="cta-wrapper" data-aos="zoom-in">
              <Link to="/products">
                <button className="cta-button">View All Products</button>
              </Link>
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default Home;