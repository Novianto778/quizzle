import QuizForm from '@/components/quiz/QuizForm';
import QuizHistory from '@/components/quiz/QuizHistory';
import { useQuizHistoryStore } from '../store/useQuizHistoryStore';

const Quiz = () => {
    const { quizHistory } = useQuizHistoryStore((state) => state);
    return (
        <div className="container pt-8">
            <h1 className="text-4xl font-bold">Start Your Quiz Now</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-8 gap-y-8">
                <QuizForm />
                <QuizHistory quizHistory={quizHistory} />
            </div>
        </div>
    );
};

export default Quiz;
