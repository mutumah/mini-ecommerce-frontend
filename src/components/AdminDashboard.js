// src/pages/admin/AdminDashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminDashboard = () => {
    const user = useSelector(state => state.user.user);

    if (!user?.isAdmin) {
        return <h2>🚫 Access Denied. Admins only.</h2>;
    }

    return (
        <div style={styles.container}>
            <h2>🛠 Admin Dashboard</h2>
            <p>Welcome, {user.name}</p>
            <div style={styles.links}>
                <Link to="/admin/products" style={styles.link}>Manage Products</Link>
                <Link to="/admin/add-product" style={styles.link}>Add New Product</Link>
                <Link to="/admin/orders" style={styles.link}>View Orders</Link>
            </div>
        </div>
    );
};

const styles = {
    container: { textAlign: "center", marginTop: "50px" },
    links: { display: "flex", flexDirection: "column", gap: "10px", marginTop: "20px" },
    link: {
        textDecoration: "none",
        backgroundColor: "#444",
        color: "#fff",
        padding: "10px 20px",
        borderRadius: "5px",
        width: "200px",
        margin: "0 auto"
    }
};

export default AdminDashboard;
