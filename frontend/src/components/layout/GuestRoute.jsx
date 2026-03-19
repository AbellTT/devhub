import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function GuestRoute() {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    // If the user IS logged in, bounce them away from Login/Signup pages
    if (isAuthenticated) {
        return <Navigate to="/feed" replace />;
    }

    // Otherwise, let them see the public page
    return <Outlet />;
}
