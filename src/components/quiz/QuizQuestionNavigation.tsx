import { cn } from '@/lib/utils';

type QuizQuestionNavigationProps = {
    totalQuestions: number;
    currentQuestion: number;
    setCurrentQuestion?: (index: number) => void;
    className?: string;
    answersResult?: string[];
} & React.HTMLAttributes<HTMLDivElement>;

const QuizQuestionNavigation = ({
    totalQuestions,
    currentQuestion,
    setCurrentQuestion,
    className,
    answersResult,
    ...props
}: QuizQuestionNavigationProps) => {
    return (
        <div className="overflow-x-auto scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-primary py-2">
            <div className="flex gap-4 w-full min-w-fit">
                {[...new Array(totalQuestions)].map((_, index) => {
                    console.log(answersResult?.[index]);

                    return (
                        <div
                            key={index}
                            className={cn(
                                'w-8 h-8 rounded-full flex justify-center items-center',
                                index < currentQuestion ? 'bg-green-500' : '',
                                answersResult?.[index] === 'incorrect' &&
                                    'bg-red-500',
                                answersResult?.[index] === 'correct' &&
                                    'bg-green-500',
                                answersResult?.[index] === 'unanswered' &&
                                    'bg-gray-600 text-white',
                                index === currentQuestion &&
                                    'bg-secondary text-black',

                                className
                            )}
                            onClick={() => setCurrentQuestion?.(index)}
                            {...props}
                        >
                            {index + 1}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default QuizQuestionNavigation;
