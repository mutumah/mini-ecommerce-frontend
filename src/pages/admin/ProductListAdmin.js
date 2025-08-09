import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listAllProducts } from "../../redux/slices/productSlice";
import axios from "axios";
import AdminSidebar from "../../pages/admin/AdminSidebar";
import "./ProductListAdmin.css";

const ProductListAdmin = () => {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(listAllProducts());
    }, [dispatch]);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;

        try {
            const token = sessionStorage.getItem("token");
            await axios.delete(`${process.env.REACT_APP_API_URL}/api/products/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            dispatch(listAllProducts());
            alert("✅ Product deleted!");
        } catch (error) {
            console.error("❌ Delete error:", error.response?.data || error.message);
            alert("Failed to delete product.");
        }
    };

    return (
        <div className="admin-layout">
            <AdminSidebar />
            <div className="admin-content">
                <h2>📦 Product Management</h2>
                {loading && <p>Loading products...</p>}
                {error && <p className="error">{error}</p>}
                
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price ($)</th>
                            <th>Stock</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((prod) => (
                            <tr key={prod._id}>
                                <td>{prod.name}</td>
                                <td>{prod.price}</td>
                                <td>{prod.stock}</td>
                                <td>
                                    <button className="btn-edit">Edit</button>
                                    <button
                                        className="btn-delete"
                                        onClick={() => handleDelete(prod._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductListAdmin;
