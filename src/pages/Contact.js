import React, { useState, useEffect } from "react";
import "./Contact.css";

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [form, setForm] = useState({ 
    name: "", 
    email: "", 
    subject: "",
    message: "" 
  });
  
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!form.message.trim()) {
      newErrors.message = "Message is required";
    } else if (form.message.trim().length < 10) {
      newErrors.message = "Message should be at least 10 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    // Simulate form submission delay
    setTimeout(() => {
      console.log("📬 Contact Form Submitted:", form);
      setSubmitted(true);
      setLoading(false);
      setForm({ name: "", email: "", subject: "", message: "" });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    }, 1000);
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <h2>Contact Us</h2>
        <p className="contact-intro">
          Have questions or feedback? We'd love to hear from you! Fill out the form below
          and our team will get back to you as soon as possible.
        </p>
        
        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-method">
              <div className="contact-icon email-icon"></div>
              <div className="contact-details">
                <h3>Email Us</h3>
                <p>support@miniecommerce.com</p>
                <p>sales@miniecommerce.com</p>
              </div>
            </div>
            
            <div className="contact-method">
              <div className="contact-icon phone-icon"></div>
              <div className="contact-details">
                <h3>Call Us</h3>
                <p>(555) 123-4567</p>
                <p>Mon-Fri: 9am - 5pm</p>
              </div>
            </div>
            
            <div className="contact-method">
              <div className="contact-icon location-icon"></div>
              <div className="contact-details">
                <h3>Visit Us</h3>
                <p>123 E-Commerce Street</p>
                <p>Digital City, DC 10101</p>
              </div>
            </div>
            
            <div className="social-links">
              <h3>Follow Us</h3>
              <div className="social-icons">
                <div className="social-icon facebook"></div>
                <div className="social-icon twitter"></div>
                <div className="social-icon instagram"></div>
                <div className="social-icon linkedin"></div>
              </div>
            </div>
          </div>
          
          <div className="form-container">
            {submitted && (
              <div className="success-msg">
                <div className="success-icon"></div>
                <div>
                  <h4>Thank you!</h4>
                  <p>We've received your message and will get back to you soon.</p>
                </div>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={handleChange}
                  className={errors.name ? "error-input" : ""}
                />
                {errors.name && <p className="error-message">{errors.name}</p>}
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={handleChange}
                  className={errors.email ? "error-input" : ""}
                />
                {errors.email && <p className="error-message">{errors.email}</p>}
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">Subject (Optional)</label>
                <input
                  id="subject"
                  type="text"
                  name="subject"
                  placeholder="What's this about?"
                  value={form.subject}
                  onChange={handleChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Your message here..."
                  value={form.message}
                  onChange={handleChange}
                  className={errors.message ? "error-input" : ""}
                  rows="5"
                ></textarea>
                {errors.message && <p className="error-message">{errors.message}</p>}
              </div>
              
              <button 
                type="submit" 
                className={loading ? "submit-btn loading" : "submit-btn"}
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;