import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { QuizInput } from '../components/quiz/QuizForm';
import { useAuthStore } from '../store/useAuthStore';
import { Categories, Login, Quiz, User } from '../types/app.types';

export const getCategories = async () => {
    const res = await axios.get<Categories>(
        'https://opentdb.com/api_category.php'
    );
    const { data } = res;

    return data.trivia_categories;
};

export const login = async ({ username, password }: Login) => {
    // const res = await axios.post
    try {
        const res = await axios.post<User>('https://dummyjson.com/auth/login', {
            username,
            password,
        });
        if (res.status === 200) {
            toast.success('Berhasil Login');
            return res.data;
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            toast.error(error?.response?.data?.message);
        } else {
            toast.error('Terjadi Kesalahan');
        }
    }
};

export const logout = () => {
    useAuthStore.getState().setUser(null);
    toast.success('Berhasil Logout');
};

export const getQuiz = async (quiz: QuizInput) => {
    try {
        const res = await axios.get('https://opentdb.com/api.php', {
            params: {
                amount: quiz.amount,
                category: quiz.categories,
                difficulty: quiz.level,
                type: quiz.type,
            },
        });
        if (res.status === 200) {
            toast.success('Berhasil Ambil Data');
            return res.data.results as Quiz[];
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            toast.error(error?.response?.data?.message);
        } else {
            toast.error('Terjadi Kesalahan');
        }
    }
};

export const getRandomQuiz = async () => {
    const randomAmount = Math.floor(Math.random() * 20) + 1;
    try {
        const res = await axios.get('https://opentdb.com/api.php', {
            params: {
                amount: randomAmount,
            },
        });
        if (res.status === 200) {
            toast.success('Berhasil Ambil Data');
            return res.data.results as Quiz[];
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            toast.error(error?.response?.data?.message);
        } else {
            toast.error('Terjadi Kesalahan');
        }
    }
};
