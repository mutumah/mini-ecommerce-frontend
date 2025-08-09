import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFacebookF, 
  faTwitter, 
  faInstagram, 
  faLinkedinIn 
} from '@fortawesome/free-brands-svg-icons';
import './Footer.css';

const Footer = () => {
  const handleTermsClick = (e) => {
    e.preventDefault();
    alert("📄 Terms & Conditions are just a mockup for this demo.");
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <h3>Mini E-Commerce</h3>
          <p>Your one-stop shop for quality products</p>
        </div>

        <div className="footer-links">
          <Link to="/products">Products</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <a href="#terms" onClick={handleTermsClick}>Terms</a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Mini E-Commerce. All rights reserved.</p>
        <div className="social-icons">
          <a 
            href="https://facebook.com" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Visit our Facebook page"
          >
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
          <a 
            href="https://twitter.com" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Visit our Twitter profile"
          >
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Visit our Instagram profile"
          >
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Visit our LinkedIn page"
          >
            <FontAwesomeIcon icon={faLinkedinIn} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
