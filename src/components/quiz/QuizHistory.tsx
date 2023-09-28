import { QuizHistory as QuizHistoryType } from '@/types/app.types';
import { Link } from 'react-router-dom';
import { formatSeconds } from '@/lib/utils';

type Props = {
    quizHistory: QuizHistoryType[];
};

const QuizHistory = ({ quizHistory }: Props) => {
    return (
        <div className="border shadow bg-white p-8">
            <h2 className="text-2xl font-bold">Quiz History</h2>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4 scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-primary">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                No
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Total Questions
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Correct Answers
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Time Spend
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Score
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {quizHistory?.length === 0 ? (
                            <tr className="bg-white">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    No Data
                                </td>
                            </tr>
                        ) : (
                            quizHistory.map((item, index) => {
                                return (
                                    <tr key={item.id} className="bg-white">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {index + 1}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {item.quiz.length}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {Math.ceil(
                                                (item.score / 100) *
                                                    item.quiz.length
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {formatSeconds(item.timeSpend)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {item.score.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <Link
                                                to={`/quiz/${item.id}/view`}
                                                className="underline font-semibold"
                                            >
                                                View Result
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default QuizHistory;
