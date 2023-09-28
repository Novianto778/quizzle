import { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoutes';
import AppLayout from '../components/layout/AppLayout';
import AuthRoutes from './AuthRoutes';
import Login from '../pages/Login';
import Quiz from '../pages/Quiz';
import PlayQuiz from '../pages/PlayQuiz';
import ResultPage from '../pages/ResultPage';

const LazyHome = lazy(() => import('../pages/Home'));
const LazyQuizView = lazy(() => import('../pages/QuizView'));

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <>
                <AppLayout />
            </>
        ),
        children: [
            {
                index: true,
                element: <LazyHome />,
            },
            {
                path: 'quiz',

                children: [
                    {
                        index: true,
                        element: (
                            <ProtectedRoutes>
                                <Quiz />
                            </ProtectedRoutes>
                        ),
                    },

                    {
                        path: 'play/:id',
                        element: (
                            <ProtectedRoutes>
                                <PlayQuiz />
                            </ProtectedRoutes>
                        ),
                    },
                    {
                        path: ':id/result',
                        element: (
                            <ProtectedRoutes>
                                <ResultPage />
                            </ProtectedRoutes>
                        ),
                    },
                    {
                        path: ':id/view',
                        element: (
                            <ProtectedRoutes>
                                <LazyQuizView />
                            </ProtectedRoutes>
                        ),
                    },
                ],
            },
            {
                path: 'login',
                element: (
                    <AuthRoutes>
                        <Login />
                    </AuthRoutes>
                ),
            },
            {
                path: 'about',
                element: (
                    <div className="container flex justify-center items-center h-content">
                        <h1 className="text-3xl">About</h1>
                    </div>
                ),
            },
            {
                path: 'contact',
                element: (
                    <div className="container flex justify-center items-center h-content">
                        <h1 className="text-3xl">Contact</h1>
                    </div>
                ),
            },
            {
                path: '*',
                element: <div>Not Found</div>,
            },
        ],
    },
]);

const AppRouter = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <RouterProvider router={router} />
        </Suspense>
    );
};

export default AppRouter;
