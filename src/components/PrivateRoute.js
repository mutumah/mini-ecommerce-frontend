import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
    const user = useSelector(state => state.user.user);

    return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
// This component checks if the user is logged in by accessing the Redux store.
// If the user is logged in, it renders the children components (the protected route).