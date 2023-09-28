import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import Button from '../components/Button';
import { login } from '../services/actions';
import { useAuthStore } from '../store/useAuthStore';
import { Input } from '../components/Input';

const validationSchema = z.object({
    username: z.string().min(1, { message: 'Username is required' }),
    password: z
        .string()
        .min(6, { message: 'Password must be atleast 6 characters' }),
});

type ValidationSchema = z.infer<typeof validationSchema>;

const Login = () => {
    const { setUser } = useAuthStore();
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ValidationSchema>({
        resolver: zodResolver(validationSchema),
    });

    const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
        setLoading(true);
        try {
            const res = await login(data);

            if (!res) return;

            setUser(res);

            setTimeout(() => {
                navigate('/');
            }, 500);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full h-content flex flex-col justify-center items-center">
            <div className="max-w-lg flex flex-col items-center bg-white shadow p-8 border-[0.5px] rounded">
                <h1 className="text-3xl font-bold">Login to Quizzle</h1>
                <p className="text-center text-body mt-4">
                    Gunakan username: kminchelle dan password: 0lelplR untuk
                    login ke Quizzle
                </p>
                <form className="w-full mt-8" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label
                            className="block mb-2 text-sm font-bold text-gray-700"
                            htmlFor="username"
                        >
                            Username
                        </label>
                        <Input
                            className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border ${
                                errors.username && 'border-red-500'
                            } rounded appearance-none focus:outline-none focus:shadow-outline`}
                            id="username"
                            type="username"
                            placeholder="kminchelle"
                            {...register('username')}
                        />
                        {errors.username && (
                            <p className="text-xs italic text-red-500 mt-2">
                                {errors.username?.message}
                            </p>
                        )}
                    </div>
                    <div className="mb-4">
                        <div className="mb-4 md:mr-2 md:mb-0">
                            <label
                                className="block mb-2 text-sm font-bold text-gray-700"
                                htmlFor="password"
                            >
                                Password
                            </label>
                            <Input
                                className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border ${
                                    errors.password && 'border-red-500'
                                } rounded appearance-none focus:outline-none focus:shadow-outline`}
                                id="password"
                                type="password"
                                placeholder="0lelplR"
                                {...register('password')}
                            />
                            {errors.password && (
                                <p className="text-xs italic text-red-500 mt-2">
                                    {errors.password?.message}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="mb-6 text-center">
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isLoading}
                        >
                            Login
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
