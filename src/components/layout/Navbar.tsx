import { cn } from '@/lib/utils';
import { logout } from '@/services/actions';
import { useAuthStore } from '@/store/useAuthStore';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Avatar from '../Avatar';
import Button from '../Button';
import { Popover, PopoverContent, PopoverTrigger } from '../Popover';

const Navbar = () => {
    const { user } = useAuthStore();
    const [showMenu, setShowMenu] = useState(false);
    const { pathname } = useLocation();

    const handleShowMenu = () => {
        setShowMenu((prev) => !prev);
    };

    const navbarMenuClass =
        'block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0';

    return (
        <nav className="bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200">
            <div className="container max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/" className="flex items-center">
                    <img
                        src="/logo.png"
                        className="h-8 mr-3"
                        alt="Flowbite Logo"
                    />
                </Link>
                <div className="flex md:order-2">
                    {user ? (
                        <div className="flex gap-6 items-center">
                            <Popover>
                                <PopoverTrigger>
                                    <Avatar
                                        image={user.image}
                                        className="cursor-pointer"
                                    />
                                </PopoverTrigger>
                                <PopoverContent className="z-[999] bg-white">
                                    <p className="text-lg font-medium">
                                        Hi, {user.firstName}
                                    </p>
                                    <p className="text-body">
                                        @{user.username}
                                    </p>
                                    <Button
                                        variant="secondary"
                                        className="mt-4 w-full"
                                        onClick={logout}
                                    >
                                        Logout
                                    </Button>
                                </PopoverContent>
                            </Popover>
                            <Button asChild>
                                <Link to="/quiz">Start Quiz</Link>
                            </Button>
                        </div>
                    ) : (
                        <Button asChild>
                            <Link to="/login">Login</Link>
                        </Button>
                    )}
                    <button
                        data-collapse-toggle="navbar-sticky"
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
                        aria-controls="navbar-sticky"
                        aria-expanded="false"
                    >
                        <span className="sr-only">Open main menu</span>
                        <Menu onClick={handleShowMenu} />
                    </button>
                </div>
                <div
                    className={cn(
                        'items-center justify-between w-full md:flex md:w-auto md:order-1',
                        showMenu ? 'block' : 'hidden'
                    )}
                    id="navbar-sticky"
                >
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
                        <li>
                            <Link
                                to="/"
                                className={cn(
                                    navbarMenuClass,
                                    pathname === '/' && 'text-blue-700'
                                )}
                                aria-current="page"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/about"
                                className={cn(
                                    navbarMenuClass,
                                    pathname === '/about' && 'text-blue-700'
                                )}
                            >
                                About
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/contact"
                                className={cn(
                                    navbarMenuClass,
                                    pathname === '/contact' && 'text-blue-700'
                                )}
                            >
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
