import { Input } from '@/components/Input';
import useCategories from '@/hooks/useCategories';
import { zodResolver } from '@hookform/resolvers/zod';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import ReactSelect from 'react-select';
import { z } from 'zod';
import Button from '../Button';
import { getQuiz, getRandomQuiz } from '@/services/actions';
import { useQuizStore } from '@/store/useQuizStore';

const validationSchema = z.object({
    categories: z.number().min(1, { message: 'Category is required' }),
    level: z.string().min(1, { message: 'Level is required' }),
    amount: z
        .number()
        .min(1, { message: 'Amount is required' })
        .max(50, { message: 'Amount must be less than 50' }),
    type: z.string().min(1, { message: 'Type is required' }),
    time: z.number().min(1, { message: 'Time is required' }),
});

export type QuizInput = z.infer<typeof validationSchema>;

const QuizForm = () => {
    const { categories } = useCategories();
    const navigate = useNavigate();
    const { setQuiz, setStartTime, setTime, reset } = useQuizStore();
    const [isLoading, setLoading] = useState(false);
    const {
        handleSubmit,
        control,
        register,
        formState: { errors },
    } = useForm<QuizInput>({
        resolver: zodResolver(validationSchema),
    });
    const options = categories.map((category) => ({
        label: category.name,
        value: category.id,
    }));

    const levelOptions = [
        { label: 'Easy', value: 'easy' },
        { label: 'Medium', value: 'medium' },
        { label: 'Hard', value: 'hard' },
    ];

    const typeOptions = [
        { label: 'Multiple Choice', value: 'multiple' },
        { label: 'True / False', value: 'boolean' },
    ];

    const handleRandomQuiz = async () => {
        setLoading(true);
        try {
            const res = await getRandomQuiz();
            if (!res) return;
            setQuiz(res);
            setStartTime(new Date());
            const randomTime = Math.floor(Math.random() * 60) + 1;
            setTime(randomTime);
            setTimeout(() => {
                setLoading(false);
                navigate('/quiz/play/' + nanoid());
            }, 500);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const onSubmit = async (data: QuizInput) => {
        setLoading(true);
        try {
            const res = await getQuiz(data);
            if (!res) return;
            reset();
            setQuiz(res);
            setStartTime(new Date());
            setTime(data.time);

            setTimeout(() => {
                navigate('/quiz/play/' + nanoid());
            }, 500);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-8">
            <div className="grid grid-cols-6 mt-6 items-center">
                <label htmlFor="categories" className="col-span-2 font-medium">
                    Categories
                </label>
                <Controller
                    control={control}
                    name="categories"
                    render={({ field }) => {
                        return (
                            <ReactSelect
                                options={options}
                                className="col-span-4"
                                isLoading={isLoading}
                                onChange={(value) =>
                                    field.onChange(value?.value)
                                }
                            />
                        );
                    }}
                />
            </div>
            {errors.categories && (
                <p className="text-xs italic text-red-500 mt-2">
                    {errors.categories?.message}
                </p>
            )}
            <div className="grid grid-cols-6 mt-6 items-center">
                <label htmlFor="level" className="col-span-2 font-medium">
                    Level
                </label>
                <Controller
                    control={control}
                    name="level"
                    render={({ field }) => {
                        return (
                            <ReactSelect
                                options={levelOptions}
                                className="col-span-4"
                                isLoading={isLoading}
                                onChange={(value) =>
                                    field.onChange(value?.value)
                                }
                            />
                        );
                    }}
                />
            </div>
            {errors.level && (
                <p className="text-xs italic text-red-500 mt-2">
                    {errors.level?.message}
                </p>
            )}
            <div className="grid grid-cols-6 mt-6 items-center">
                <label
                    htmlFor="numberofquestion"
                    className="col-span-2 font-medium"
                >
                    Number of Question
                </label>
                <Input
                    type="number"
                    placeholder="1 - 50"
                    className="col-span-4"
                    defaultValue={10}
                    {...register('amount', { valueAsNumber: true })}
                />
            </div>
            {errors.amount && (
                <p className="text-xs italic text-red-500 mt-2">
                    {errors.amount?.message}
                </p>
            )}
            <div className="grid grid-cols-6 mt-6 items-center">
                <label htmlFor="type" className="col-span-2 font-medium">
                    Type
                </label>
                <Controller
                    control={control}
                    name="type"
                    render={({ field }) => {
                        return (
                            <ReactSelect
                                options={typeOptions}
                                className="col-span-4"
                                isLoading={isLoading}
                                onChange={(value) =>
                                    field.onChange(value?.value)
                                }
                            />
                        );
                    }}
                />
            </div>
            {errors.type && (
                <p className="text-xs italic text-red-500 mt-2">
                    {errors.type?.message}
                </p>
            )}
            <div className="grid grid-cols-6 mt-6 items-center">
                <label htmlFor="time" className="col-span-2 font-medium">
                    Time per Question
                </label>
                <Input
                    type="number"
                    className="col-span-4"
                    placeholder="time in seconds"
                    defaultValue={60}
                    {...register('time', { valueAsNumber: true })}
                />
            </div>
            {errors.time && (
                <p className="text-xs italic text-red-500 mt-2">
                    {errors.time?.message}
                </p>
            )}
            <div className="flex gap-6 mt-8">
                <Button type="submit" disabled={isLoading}>
                    Start Quiz
                </Button>
                <span>or</span>
                <Button
                    variant="secondary"
                    type="button"
                    onClick={handleRandomQuiz}
                >
                    Random Quiz
                </Button>
            </div>
        </form>
    );
};

export default QuizForm;
