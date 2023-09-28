import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Button from '@/components/Button';
import QuizQuestionNavigation from '@/components/quiz/QuizQuestionNavigation';
import { useQuizHistoryStore } from '@/store/useQuizHistoryStore';
import { useQuizStore } from '@/store/useQuizStore';
import ExitModal from '../components/quiz/ExitModal';

const PlayQuiz = () => {
    const {
        quiz,
        currentQuestion,
        isFinished,
        startTime,
        time,
        setIsFinished,
        nextQuestion,
        addAnswer,
        answers,
        reset,
    } = useQuizStore();
    const [open, setOpen] = useState(false);
    const { addQuizHistory, quizHistory } = useQuizHistoryStore();
    const [currentTime, setCurrentTime] = useState(0);
    const navigate = useNavigate();
    const params = useParams();

    const currentQuizHistory = useMemo(() => {
        if (!quizHistory) return null;
        return quizHistory.find((item) => item.id === params.id);
    }, [quizHistory, params.id]);

    const questionOptions = useMemo(() => {
        if (!quiz) return [];
        if (quiz[currentQuestion]?.type === 'boolean') return ['True', 'False'];
        const options = [
            ...quiz[currentQuestion].incorrect_answers,
            quiz[currentQuestion].correct_answer,
        ];

        return options.sort(() => Math.random() - 0.5);
    }, [currentQuestion, quiz]);

    const isQuizExpired =
        quiz && dayjs().diff(startTime, 'seconds') > time * quiz.length;

    useEffect(() => {
        if (!quiz) return;
        const totalSecondsLeft =
            time * quiz.length - dayjs().diff(startTime, 'seconds');

        if (totalSecondsLeft <= 0) {
            setIsFinished(true);
            return;
        }
        setCurrentTime(totalSecondsLeft);
        const interval = setInterval(() => {
            setCurrentTime((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [quiz, startTime, time, setIsFinished, currentTime]);

    const handleAnswer = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const answer = e.currentTarget.textContent;
        if (!answer || !quiz) return;
        addAnswer(currentQuestion, answer);
        if (currentQuestion === quiz.length - 1) {
            setIsFinished(true);
            return;
        }
        setTimeout(() => {
            nextQuestion();
            // reset radio button
            const radios = document.querySelectorAll(
                'input[type="radio"]'
            ) as NodeListOf<HTMLInputElement>;
            radios.forEach((radio) => {
                radio.checked = false;
            });
        }, 1000);
    };

    const totalCorrectAnswers = useMemo(() => {
        if (!quiz) return 0;
        return quiz.reduce((acc, curr, index) => {
            if (curr.correct_answer === answers[index]) {
                return acc + 1;
            }
            return acc;
        }, 0);
    }, [quiz, answers]);

    const handleCloseModal = () => {
        setOpen(false);
        setIsFinished(true);
    };

    useEffect(() => {
        if (!quiz) return;

        if (currentQuestion > quiz?.length - 1) {
            setIsFinished(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentQuestion]);

    useEffect(() => {
        if (!quiz || !params.id) return;
        if (isFinished) {
            addQuizHistory({
                id: params.id,
                quiz: quiz,
                answers,
                createdAt: new Date(),
                score: (totalCorrectAnswers / quiz.length) * 100,
                timeSpend: time * quiz.length - currentTime,
            });
            reset();
            navigate(`/quiz/${params.id}/result`);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isQuizExpired, isFinished, navigate, params.id, answers]);

    if (currentQuizHistory) {
        return (
            <div className="flex flex-col gap-4 items-center justify-center h-content">
                <h1 className="text-4xl font-bold">
                    You already played this quiz
                </h1>
                <Button variant="secondary" asChild>
                    <Link to={`/quiz/${currentQuizHistory.id}/result`}>
                        View Result
                    </Link>
                </Button>
            </div>
        );
    }

    if (!quiz)
        return (
            <div className="flex flex-col gap-4 items-center justify-center h-content">
                <h1 className="text-4xl font-bold">Quiz not found</h1>
                <Button variant="secondary" asChild>
                    <Link to="/quiz">Start A New Quiz</Link>
                </Button>
            </div>
        );

    if (isQuizExpired) {
        return (
            <div className="flex flex-col gap-4 items-center justify-center h-content">
                <h1 className="text-4xl font-bold">Quiz is expired</h1>
                <Button variant="secondary" asChild>
                    <Link to="/quiz">Start A New Quiz</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="pt-8 container h-quiz relative">
            <ExitModal
                open={open}
                setOpen={setOpen}
                onCloseModal={handleCloseModal}
            />
            <QuizQuestionNavigation
                currentQuestion={currentQuestion}
                totalQuestions={quiz.length}
            />
            <div className="text-2xl font-semibold mt-4">
                Time Remaining: {currentTime}
            </div>
            <h2 className="text-2xl font-semibold mt-4">
                Question {currentQuestion + 1}
            </h2>
            <div
                className="text-4xl font-bold mt-4"
                dangerouslySetInnerHTML={{
                    __html: quiz[currentQuestion].question,
                }}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                {questionOptions.map((answer, index) => {
                    return (
                        // radio button as button
                        <label className="cursor-pointer">
                            <input
                                type="radio"
                                className="peer sr-only"
                                name={'answer'}
                            />
                            <div
                                key={index}
                                onClick={handleAnswer}
                                className="bg-gray-200 hover:bg-gray-300 p-8 text-black text-xl peer-checked:ring-blue-400 peer-checked:bg-primary peer-checked:text-white text-center rounded"
                                dangerouslySetInnerHTML={{ __html: answer }}
                            />
                        </label>
                    );
                })}
            </div>
            <Button
                variant="outlined"
                className="absolute bottom-0 right-0"
                onClick={() => setOpen(true)}
            >
                Exit Quiz
            </Button>
        </div>
    );
};

export default PlayQuiz;
