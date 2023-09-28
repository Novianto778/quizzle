import { useState } from 'react';
import { useQuizHistoryStore } from '@/store/useQuizHistoryStore';
import { Link, useParams } from 'react-router-dom';
import { cn } from '@/lib/utils';
import Button from '@/components/Button';
import QuizQuestionNavigation from '@/components/quiz/QuizQuestionNavigation';

const QuizView = () => {
    const params = useParams<{ id: string }>();
    const { quizHistory } = useQuizHistoryStore((state) => state);
    const currentQuiz = quizHistory.find((item) => item.id === params.id);
    const [currentQuestion, setCurrentQuestion] = useState(0);

    if (!currentQuiz) return null;
    const questionOptions = [
        ...currentQuiz.quiz[currentQuestion].incorrect_answers,
        currentQuiz.quiz[currentQuestion].correct_answer,
    ];
    const currentQuizAnswer = currentQuiz.answers[currentQuestion];
    const correctAnswer = currentQuiz.quiz[currentQuestion].correct_answer;
    const answersResult = currentQuiz.quiz.map((item, index) => {
        if (!currentQuiz.answers[index]) return 'unanswered';
        return item.correct_answer === currentQuiz.answers[index] ? 'correct' : 'incorrect'
    });
    return (
        <div className="container pt-8 relative h-quiz">
            <QuizQuestionNavigation
                totalQuestions={currentQuiz.quiz.length}
                currentQuestion={currentQuestion}
                setCurrentQuestion={setCurrentQuestion}
                answersResult={answersResult}
                className="cursor-pointer"
            />
            <h2 className="text-2xl font-semibold mt-4">
                Question {currentQuestion + 1}
            </h2>
            <div
                className="text-4xl font-bold mt-4"
                dangerouslySetInnerHTML={{
                    __html: currentQuiz?.quiz[currentQuestion].question,
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
                                disabled
                            />
                            <div
                                key={index}
                                className={cn(
                                    'bg-gray-200 p-8 text-black text-xl text-center rounded',
                                    currentQuizAnswer === answer &&
                                        'bg-red-500',
                                    correctAnswer === answer && 'bg-green-500',
                                    !currentQuizAnswer &&
                                        correctAnswer !== answer &&
                                        'bg-red-500'
                                )}
                                dangerouslySetInnerHTML={{ __html: answer }}
                            />
                        </label>
                    );
                })}
            </div>
            <div className="flex mt-8 justify-between items-center md:absolute w-full bottom-10">
                <Button variant="outlined" className="mr-4" asChild>
                    <Link to="/quiz">Back to Quiz</Link>
                </Button>
                <div className="flex gap-4 justify-end">
                    {currentQuestion > 0 && (
                        <Button
                            variant="secondary"
                            onClick={() =>
                                setCurrentQuestion(currentQuestion - 1)
                            }
                        >
                            Previous
                        </Button>
                    )}
                    {currentQuestion < currentQuiz.quiz.length - 1 && (
                        <Button
                            onClick={() =>
                                setCurrentQuestion(currentQuestion + 1)
                            }
                        >
                            Next
                        </Button>
                    )}
                    {currentQuestion === currentQuiz.quiz.length - 1 && (
                        <Button variant="primary">
                            <Link to={`/quiz/${params.id}/result`}>
                                View Result
                            </Link>
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QuizView;
