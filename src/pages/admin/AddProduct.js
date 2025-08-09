import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../pages/admin/AdminSidebar"; 
import "./AddProduct.css";

const API_BASE = process.env.REACT_APP_API_URL;

const AddProduct = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
    category: "",
    stock: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleImageUpload = async () => {
    if (!imageFile) return null;
    const formData = new FormData();
    formData.append("image", imageFile);
    setUploading(true);

    try {
      const { data } = await axios.post(`${API_BASE}/api/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data.imageUrl;
    } catch (err) {
      console.error("❌ Image upload failed:", err);
      alert("Image upload failed.");
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let imageUrl = form.imageUrl;
      if (imageFile && !imageUrl) {
        imageUrl = await handleImageUpload();
        if (!imageUrl) throw new Error("Image upload failed");
      }

      const token = sessionStorage.getItem("token");
      const productData = { ...form, imageUrl };

      await axios.post(`${API_BASE}/api/products`, productData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      alert("✅ Product added successfully!");
      navigate("/admin/products");
    } catch (err) {
      console.error("❌ Error adding product:", err);
      setError("Failed to add product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-product-page">
      <AdminSidebar /> 
      <div className="add-product-content">
        <div className="add-product-container">
          <h2>Add New Product</h2>
          {error && <p className="error-msg">{error}</p>}

          <form onSubmit={handleSubmit} className="add-product-form">
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={form.price}
              onChange={handleChange}
              required
            />
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {uploading && <p className="uploading-text">Uploading image...</p>}
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={form.category}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="stock"
              placeholder="Stock"
              value={form.stock}
              onChange={handleChange}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Product"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
