import React, { useEffect, useState } from "react";

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const API_BASE_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/api/orders/my-orders`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    },
                });

                const data = await res.json();

                if (!res.ok) throw new Error(data.message || "Failed to fetch orders");

                setOrders(data);
            } catch (err) {
                setError(err.message);
                console.error("❌ Failed to fetch orders:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [API_BASE_URL]);

    if (loading) return <p>Loading orders...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div style={styles.container}>
            <h2>🧾 My Orders</h2>
            {orders.length === 0 ? (
                <p>You have no orders yet.</p>
            ) : (
                orders.map((order) => (
                    <div key={order._id} style={styles.orderCard}>
                        <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                        <p><strong>Total:</strong> ${order.totalAmount.toFixed(2)}</p>
                        <p><strong>Status:</strong> {order.status || "Pending"}</p>
                        <ul>
                            {order.items.map((item, index) => (
                                <li key={index}>
                                    {item.name} x {item.quantity} — ${item.price}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            )}
        </div>
    );
};

const styles = {
    container: { 
        padding: "20px", 
        textAlign: "center", 
        marginTop: "80px" // Adjust to match navbar height
    },
    orderCard: { 
        border: "1px solid #ccc", 
        padding: "15px", 
        marginBottom: "20px", 
        borderRadius: "8px", 
        maxWidth: "500px", 
        margin: "20px auto" 
    }
};


export default MyOrders;
