import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { QuizHistory } from '../types/app.types';

type QuizHistoryState = {
    quizHistory: QuizHistory[];
    setQuizHistory: (quizHistory: QuizHistory[]) => void;
    addQuizHistory: (quizHistory: QuizHistory) => void;
};

export const useQuizHistoryStore = create<QuizHistoryState>()(
    persist(
        (set) => ({
            quizHistory: [],
            setQuizHistory: (quizHistory) => set({ quizHistory }),
            addQuizHistory: (quizHistory) =>
                set((state) => {
                    const quizHistoryArray = [...state.quizHistory];
                    quizHistoryArray.push(quizHistory);
                    return { quizHistory: quizHistoryArray };
                }),
        }),
        {
            name: 'history-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
