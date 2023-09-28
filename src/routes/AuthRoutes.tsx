import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

type AuthRoutesProps = {
    children: React.ReactNode;
};

const AuthRoutes = ({ children }: AuthRoutesProps) => {
    const { user } = useAuthStore();
    const { pathname } = useLocation();
    const authRoutes = ['/login', '/register'];

    if (authRoutes.includes(pathname) && user) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default AuthRoutes;
