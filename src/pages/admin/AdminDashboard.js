import React from 'react';
import { useSelector } from 'react-redux';
import AdminSidebar from '../../pages/admin/AdminSidebar';
import './AdminLayout.css';

const AdminDashboard = () => {
    const user = useSelector((state) => state.user.user);

    if (!user?.isAdmin) {
        return <h2 className="access-denied">🚫 Access Denied. Admins only.</h2>;
    }

    return (
        <div className="admin-layout">
            <AdminSidebar />
            <div className="admin-content">
                <h2>🛠 Admin Dashboard</h2>
                <p>Welcome, {user.name}</p>
            </div>
        </div>
    );
};

export default AdminDashboard;
