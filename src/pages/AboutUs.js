import React, { useEffect } from "react";
import "./AboutUs.css";

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="about-container">
      <h2>About Mini E-Commerce</h2>
      
      <section className="about-section">
        <h3>Our Story</h3>
        <p>
          Founded in 2024, Mini E-Commerce started with a simple idea: shopping should be simple, 
          fast, and enjoyable. What began as a small venture has now grown into a trusted 
          online destination for thousands of customers looking for quality products at great prices.
        </p>
        <p>
          Our journey has been driven by our passion for connecting people with products they love,
          all while providing an exceptional shopping experience from browse to delivery.
        </p>
      </section>
      
      <section className="about-section">
        <h3>Our Mission</h3>
        <p>
          At Mini E-Commerce, we believe shopping should be simple, fast, and enjoyable. Our mission is to 
          bring you top-quality products at unbeatable prices — all with just a few clicks.
        </p>
        <p>
          Whether you're shopping for tech gadgets, home essentials, or fashion accessories, we've got 
          something for everyone. Our team is committed to ensuring a smooth and secure online shopping experience.
        </p>
      </section>
      
      <section className="about-section">
        <h3>Our Values</h3>
        <div className="values-container">
          <div className="value-item">
            <h4>Quality First</h4>
            <p>We carefully curate our product selection to ensure only the best items make it to our store.</p>
          </div>
          <div className="value-item">
            <h4>Customer Satisfaction</h4>
            <p>Your happiness is our priority. We're not satisfied until you are.</p>
          </div>
          <div className="value-item">
            <h4>Transparency</h4>
            <p>Clear pricing, honest descriptions, and no hidden fees — always.</p>
          </div>
          <div className="value-item">
            <h4>Innovation</h4>
            <p>We continuously improve our platform to make your shopping experience better every day.</p>
          </div>
        </div>
      </section>
      

      <section className="about-section testimonial">
        <blockquote>
          "Thank you for choosing Mini E-Commerce. We're proud to be a part of your everyday life."
        </blockquote>
        <p className="signature">— The Mini E-Commerce Team</p>
      </section>
    </div>
  );
};

export default AboutUs;