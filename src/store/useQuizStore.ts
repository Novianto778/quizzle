import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { Quiz } from '../types/app.types';

type QuizState = {
    quiz: Quiz[] | null;
    setQuiz: (quiz: Quiz[] | null) => void;
    time: number;
    setTime: (time: number) => void;
    currentQuestion: number;
    setCurrentQuestion: (currentQuestion: number) => void;
    nextQuestion: () => void;
    answers: string[];
    addAnswer: (index: number, answer: string) => void;
    isFinished: boolean;
    setIsFinished: (isFinished: boolean) => void;
    startTime: Date | null;
    setStartTime: (startTime: Date) => void;
    reset: () => void;
};

export const useQuizStore = create<QuizState>()(
    persist(
        (set) => ({
            quiz: null,
            setQuiz: (quiz) => set({ quiz }),
            time: 0,
            setTime: (time) => set({ time }),
            currentQuestion: 0,
            setCurrentQuestion: (currentQuestion) => set({ currentQuestion }),
            nextQuestion: () =>
                set((state) => ({
                    currentQuestion: state.currentQuestion + 1,
                })),
            answers: [],
            addAnswer: (index, answer) =>
                set((state) => {
                    const answers = [...state.answers];
                    answers[index] = answer;
                    return { answers };
                }),
            isFinished: false,
            setIsFinished: (isFinished) => set({ isFinished }),
            startTime: null,
            setStartTime: (startTime) => set({ startTime }),
            reset: () =>
                set({
                    quiz: null,
                    time: 0,
                    currentQuestion: 0,
                    answers: [],
                    isFinished: false,
                    startTime: null,
                }),
        }),
        {
            name: 'quiz-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
