import { useQuizHistoryStore } from '@/store/useQuizHistoryStore';
import Confetti from 'react-confetti';
import { Link, useParams } from 'react-router-dom';
import Button from '../components/Button';
import { formatSeconds } from '../lib/utils';

const ResultPage = () => {
    const params = useParams<{ id: string }>();
    const quizHistory = useQuizHistoryStore((state) => state.quizHistory);
    const currentQuiz = quizHistory.find((item) => item.id === params.id);

    if (!currentQuiz) return null;
    const correctAnswers = Math.ceil(
        (currentQuiz?.score / 100) * currentQuiz?.quiz?.length
    );
    return (
        <>
            <Confetti width={window.innerWidth} height={window.innerHeight} />
            <div className="container pt-8 flex flex-col gap-4 items-center justify-center">
                <h1 className="text-4xl font-bold text-primary">
                    You have finished the Quiz!
                </h1>
                <img src="/congrats.svg" alt="" width={180} />
                <h2 className="text-3xl font-semibold tracking-widest">
                    Quiz Summary
                </h2>
                {/* <h2>{currentQuiz?.score.toFixed(2)}</h2>
                <p>Correct Answers: </p> */}
                <div className="flex flex-col gap-2 items-center">
                    <p className="text-xl">
                        <span className="font-semibold">Total Questions:</span>{' '}
                        {currentQuiz?.quiz?.length}
                    </p>
                    <p className="text-xl">
                        <span className="font-semibold">Correct Anwser:</span>{' '}
                        {correctAnswers}
                    </p>
                    <p className="text-xl">
                        <span className="font-semibold">Total Time:</span>{' '}
                        {formatSeconds(currentQuiz?.timeSpend)}
                    </p>
                    <p className="text-2xl">
                        <span className="font-semibold">Score:</span>{' '}
                        {currentQuiz?.score.toFixed(2)}
                    </p>
                </div>
                <div className="flex gap-6 items-center">
                    <Button variant="secondary">
                        <Link to="/quiz">Start A New Quiz</Link>
                    </Button>
                    <Button>
                        <Link to={`/quiz/${params.id}/view`}>View Answers</Link>
                    </Button>
                </div>
            </div>
        </>
    );
};

export default ResultPage;
