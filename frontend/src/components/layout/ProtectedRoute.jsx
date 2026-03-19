import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ProtectedRoute() {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    // If the user is NOT logged in, redirect them to Login and replace the history
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Otherwise, render the protected component!
    return <Outlet />;
}
