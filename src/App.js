import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; 
import Home from "./pages/Home";
import Products from './pages/Products';
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Checkout from "./pages/Checkout";
import PrivateRoute from "./components/PrivateRoute";
import MyOrders from "./pages/MyOrders";
import AdminDashboard from './pages/admin/AdminDashboard';
import ProductListAdmin from './pages/admin/ProductListAdmin';
import AddProduct from './pages/admin/AddProduct';
import OrderList from './pages/admin/OrderList';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/checkout" element={
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        } />
        <Route path="/my-orders" element={
          <PrivateRoute>
            <MyOrders />
          </PrivateRoute>
        } />
        <Route path="/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
        <Route path="/admin/products" element={<PrivateRoute><ProductListAdmin /></PrivateRoute>} />
        <Route path="/admin/add-product" element={<PrivateRoute><AddProduct /></PrivateRoute>} />
        <Route path="/admin/orders" element={<PrivateRoute><OrderList /></PrivateRoute>} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <Footer /> 
    </Router>
  );
}

export default App;
