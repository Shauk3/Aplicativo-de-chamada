import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function ProtectedRoute({ children, allowedRoles }) {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        // Redirect to appropriate dashboard if role doesn't match
        return <Navigate to={user.role === 'admin' ? '/admin' : '/professor'} replace />;
    }

    return children;
}
