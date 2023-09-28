export type Categories = {
    trivia_categories: {
        id: number;
        name: string;
    }[];
};

export type Login = {
    username: string;
    password: string;
};

export type User = {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    image: string;
    token: string;
};

export type Quiz = {
    category: string;
    type: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
};

export type QuizHistory = {
    id: string;
    quiz: Quiz[];
    answers: string[];
    timeSpend: number;
    score: number;
    createdAt: Date;
};
