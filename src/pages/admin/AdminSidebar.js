import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./AdminSidebar.css";

const AdminSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button 
                className="sidebar-toggle" 
                onClick={() => setIsOpen(!isOpen)}
            >
                ☰
            </button>

            <div className={`admin-sidebar ${isOpen ? "open" : ""}`}>
                <div className="sidebar-title">Admin Panel</div>
                <div className="sidebar-links">
                    <NavLink to="/admin/products" className="sidebar-link">Manage Products</NavLink>
                    <NavLink to="/admin/add-product" className="sidebar-link">Add Product</NavLink>
                    <NavLink to="/admin/orders" className="sidebar-link">View Orders</NavLink>
                </div>
            </div>
        </>
    );
};

export default AdminSidebar;
