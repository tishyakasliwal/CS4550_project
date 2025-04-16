import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });

const QUIZZES_API = `${import.meta.env.VITE_REMOTE_SERVER}/api/quizzes`;
const COURSES_API = `${import.meta.env.VITE_REMOTE_SERVER}/api/courses`;

export const createQuiz = async (quiz: any) => {
    const response = await axiosWithCredentials.post(QUIZZES_API, quiz);
    return response.data;
};

export const updateQuiz = async (quizId: string, quiz: any) => {
    const response = await axiosWithCredentials.put(`${QUIZZES_API}/${quizId}`, quiz);
    return response.data;
};

export const deleteQuiz = async (quizId: string) => {
    const response = await axiosWithCredentials.delete(`${QUIZZES_API}/${quizId}`);
    return response.data;
};

export const findQuizzesForCourse = async (courseId: string) => {
    const response = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/quizzes`);
    return response.data;
};

export const findQuestionsForQuiz = async (quizId: string) => {
    const response = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}/questions`);
    return response.data;
};


