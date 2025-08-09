import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../../pages/admin/AdminSidebar";
import "./OrderList.css";

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filterStatus, setFilterStatus] = useState("all");

    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

    const handleFulfill = async (orderId) => {
        if (!window.confirm("Mark this order as Fulfilled?")) return;

        try {
            const token = sessionStorage.getItem("token");

            await axios.patch(`${API_URL}/api/orders/${orderId}/fulfill`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });

            alert("✅ Order marked as fulfilled!");
            setOrders(prev =>
                prev.map(o => o._id === orderId ? { ...o, status: "Fulfilled" } : o)
            );
        } catch (err) {
            console.error("❌ Error updating order status:", err);
            alert("Failed to update order status.");
        }
    };

    const filteredOrders = orders.filter(order => {
        if (filterStatus === "all") return true;
        if (filterStatus === "Fulfilled") {
            return order.status === "Fulfilled" || order.status === "delivered";
        }
        return order.status === filterStatus;
    });

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = sessionStorage.getItem("token");
                if (!token) {
                    setError("Authentication required. Please login.");
                    setLoading(false);
                    return;
                }

                const response = await axios.get(`${API_URL}/api/orders`, {
                    headers: { 
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                if (response.data.success) {
                    setOrders(response.data.orders);
                } else {
                    throw new Error(response.data.message || "Failed to fetch orders");
                }
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch orders");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [API_URL]);

    return (
        <div className="order-list-layout">
            <AdminSidebar />

            <div className="order-list-container">
                <h2>📋 All Orders</h2>

                <div className="filter-container">
                    <label>Filter by Status: </label>
                    <select 
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="all">All Orders</option>
                        <option value="Processing">Processing</option>
                        <option value="Fulfilled">Fulfilled</option>
                    </select>
                </div>

                {loading && <p>Loading orders...</p>}
                {error && <p className="error-message">{error}</p>}
                {!loading && !error && orders.length === 0 && <p>No orders found.</p>}

                {!loading && filteredOrders.length > 0 && (
                    <table className="orders-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>User</th>
                                <th>Total</th>
                                <th>Payment</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map(order => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.user?.name || "N/A"}</td>
                                    <td>${(order.totalAmount || 0).toFixed(2)}</td>
                                    <td>{order.paymentMethod || "N/A"}</td>
                                    <td>{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "N/A"}</td>
                                    <td className="status-cell">
                                        {order.status === "delivered" ? "Fulfilled" : order.status || "Processing"}
                                    </td>
                                    <td>
                                        {(order.status === "Fulfilled" || order.status === "delivered") ? (
                                            <span className="fulfilled-status">✅ Fulfilled</span>
                                        ) : (
                                            <button 
                                                onClick={() => handleFulfill(order._id)}
                                                className="fulfill-button"
                                                disabled={order.status === "Fulfilled" || order.status === "delivered"}
                                            >
                                                Mark as Fulfilled
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {!loading && !error && filteredOrders.length === 0 && (
                    <p>No orders found for the selected filter.</p>
                )}
            </div>
        </div>
    );
};

export default OrderList;
