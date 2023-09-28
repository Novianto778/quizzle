import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
type ProtectedRoutesProps = {
    children: React.ReactNode;
};
const ProtectedRoutes = ({ children }: ProtectedRoutesProps) => {
    const { user } = useAuthStore();

    if (!user) {
        return <Navigate to="/" replace />;
    }
    return children;
};

export default ProtectedRoutes;
