import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/userSlice';
import './Navbar.css';

const Navbar = () => {
    // Use false for initial state to ensure sidebar is hidden on load
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);
    // Add a state to handle initial load
    const [isLoaded, setIsLoaded] = useState(false);
    // Add state for navbar visibility
    const [isNavbarVisible, setIsNavbarVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    
    // Set loaded state after component mounts
    useEffect(() => {
        setIsLoaded(true);
    }, []);
    const totalQuantity = useSelector(state => state.cart.totalQuantity);
    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch();
    const location = useLocation();
    const userMenuRef = useRef(null);
    const navRef = useRef(null);
    
    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
        // When opening mobile menu, close user dropdown
        if (!mobileMenuOpen) {
            setUserDropdownOpen(false);
        }
        // Toggle body scroll when sidebar is open
        document.body.style.overflow = !mobileMenuOpen ? 'hidden' : '';
    };
    
    const toggleUserDropdown = (e) => {
        e.stopPropagation();
        setUserDropdownOpen(!userDropdownOpen);
    };
    
    const closeMenus = () => {
        setMobileMenuOpen(false);
        setUserDropdownOpen(false);
        document.body.style.overflow = '';
    };
    
    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setUserDropdownOpen(false);
            }
        };
        
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            // Ensure body scroll is restored when component unmounts
            document.body.style.overflow = '';
        };
    }, []);

    // Add scroll handler for navbar visibility
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            // Show navbar when scrolling up or at the top
            if (currentScrollY <= 0) {
                setIsNavbarVisible(true);
            } else if (currentScrollY < lastScrollY) {
                // Scrolling up
                setIsNavbarVisible(true);
            } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
                // Scrolling down and not at the top
                setIsNavbarVisible(false);
            }
            
            // Check if we should add 'scrolled' class
            const navbarElement = document.querySelector('.enhanced-navbar');
            if (navbarElement) {
                if (currentScrollY > 60) {
                    navbarElement.classList.add('scrolled');
                } else {
                    navbarElement.classList.remove('scrolled');
                }
            }
            
            setLastScrollY(currentScrollY);
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);

    // Close mobile menu on resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768 && mobileMenuOpen) {
                setMobileMenuOpen(false);
                document.body.style.overflow = '';
            }
        };
        
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [mobileMenuOpen]);

    // Close mobile menu on location change
    useEffect(() => {
        closeMenus();
    }, [location]);

    return (
        <>
            {/* Overlay for mobile sidebar */}
            <div 
                className={`sidebar-overlay ${mobileMenuOpen ? "show" : ""}`}
                onClick={closeMenus}
            ></div>
            
            <nav className={`enhanced-navbar ${!isNavbarVisible ? 'nav-hidden' : ''} ${mobileMenuOpen ? 'menu-open' : ''}`}>
                <div className="navbar-container">
                    <Link to="/" className="logo" onClick={closeMenus}>🛍 E-Shop</Link>

                    <button 
                        className={`hamburger ${mobileMenuOpen ? "open" : ""}`} 
                        onClick={toggleMobileMenu} 
                        aria-label="Toggle menu"
                        aria-expanded={mobileMenuOpen}
                    >
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </button>

                    <ul className={`nav-links ${mobileMenuOpen ? "show" : ""} ${!isLoaded ? "initial-load" : ""}`} ref={navRef}>
                        <li>
                            <Link to="/" className={location.pathname === "/" ? "active" : ""} onClick={closeMenus}>Home</Link>
                        </li>
                        <li>
                            <Link to="/products" className={location.pathname === "/products" ? "active" : ""} onClick={closeMenus}>Products</Link>
                        </li>
                        <li>
                            <Link to="/cart" className="cart-link" onClick={closeMenus}>
                                🛒 Cart
                                {totalQuantity > 0 && <span className="cart-badge">{totalQuantity}</span>}
                            </Link>
                        </li>

                        {user ? (
                            <>
                                {user.isAdmin && (
                                    <li>
                                        <Link to="/admin/products" onClick={closeMenus}>🛠 Admin Panel</Link>
                                    </li>
                                )}
                                <li className="user-menu" ref={userMenuRef}>
                                    <button 
                                        onClick={toggleUserDropdown}
                                        aria-expanded={userDropdownOpen}
                                    >
                                        👤 {user.name} ▾
                                    </button>
                                    {userDropdownOpen && (
                                        <ul className="user-dropdown">
                                            <li><Link to="/my-orders" onClick={closeMenus}>📦 My Orders</Link></li>
                                            <li>
                                                <button onClick={() => {
                                                    dispatch(logout());
                                                    closeMenus();
                                                }}>
                                                    🔓 Logout
                                                </button>
                                            </li>
                                        </ul>
                                    )}
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to="/login" onClick={closeMenus}>Login</Link>
                                </li>
                                <li>
                                    <Link to="/signup" onClick={closeMenus}>Sign Up</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </nav>
        </>
    );
};

export default Navbar;