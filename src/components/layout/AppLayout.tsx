import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

const AppLayout = () => {
    return (
        <>
            <Toaster />
            <Navbar />
            <div className="mt-20">
                <Outlet />
            </div>
        </>
    );
};

export default AppLayout;
