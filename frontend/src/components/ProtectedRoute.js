// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Element, requiredRole, ...rest }) => {
    const token = localStorage.getItem('token');
    const userRolesString = localStorage.getItem('userRoles');
    const userRoles = userRolesString ? JSON.parse(userRolesString) : [];

    const hasAccess = token && userRoles.includes(requiredRole);

    return hasAccess ? <Element {...rest} /> : <Navigate to="/connexion" replace />;
};

export default ProtectedRoute;
