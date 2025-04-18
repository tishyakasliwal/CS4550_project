import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });

const QUIZZES_API = `${import.meta.env.VITE_REMOTE_SERVER}/api/quizzes`;
const COURSES_API = `${import.meta.env.VITE_REMOTE_SERVER}/api/courses`;
const MCQ_API = `${import.meta.env.VITE_REMOTE_SERVER}/api/mcq`;
const FILL_IN_THE_BLANK_API = `${import.meta.env.VITE_REMOTE_SERVER}/api/fillinquestions`;
const TRUE_FALSE_API = `${import.meta.env.VITE_REMOTE_SERVER}/api/tfquestions`;

// export const createQuiz = async (quiz: any) => {
//     const response = await axiosWithCredentials.post(QUIZZES_API, quiz);
//     return response.data;
// };

export const createQuiz = async (quiz: any) => {
    console.log("Creating quiz with URL:", `${import.meta.env.VITE_REMOTE_SERVER}/api/quizzes`);
    console.log("Quiz data being sent:", quiz);
    try {
        const response = await axiosWithCredentials.post(QUIZZES_API, quiz);
        console.log("Successfully created quiz:", response.data);
        return response.data;
    } catch (error: any) {
        console.error("Response status:", error.response?.status);
        console.error("Response data:", error.response?.data);
        throw error;
    }
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

export const findQuizById = async (quizId: string) => {
    const response = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}`);
    return response.data;
}




// Create a new MCQ question
export const createMCQQuestion = async (question: any) => {
    const response = await axiosWithCredentials.post(MCQ_API, question);
    return response.data;
};

// Update an existing MCQ question
export const updateMCQQuestion = async (questionId: string, questionUpdates: any) => {
    const response = await axiosWithCredentials.put(`${MCQ_API}/${questionId}`, questionUpdates);
    return response.data;
};

// Delete a choice from an MCQ question
export const deleteMCQChoice = async (questionId: string, choice: string) => {
    const response = await axiosWithCredentials.delete(`${MCQ_API}/${questionId}/choices/${choice}`);
    return response.data;
};

// Add a new choice to an MCQ question
export const addMCQChoice = async (questionId: string, choice: any) => {
    const response = await axiosWithCredentials.post(`${MCQ_API}/${questionId}/choices`, choice);
    return response.data;
};

// Update the correct answer for an MCQ question
export const updateMCQCorrectAnswer = async (questionId: string, choice: string) => {
    const response = await axiosWithCredentials.put(`${MCQ_API}/${questionId}/correctAnswer`, { choice });
    return response.data;
};


// Create a new True/False question
export const createTFQuestion = async (question: any) => {
    const response = await axiosWithCredentials.post(TRUE_FALSE_API, question);
    return response.data;
};

// Update an existing True/False question
export const updateTFQuestion = async (questionId: string, questionUpdates: any) => {
    const response = await axiosWithCredentials.put(`${TRUE_FALSE_API}/${questionId}`, questionUpdates);
    return response.data;
};


// Create a new Fill-in-the-Blank question
export const createFillInQuestion = async (question: any) => {
    const response = await axiosWithCredentials.post(FILL_IN_THE_BLANK_API, question);
    return response.data;
};

// Add a correct choice to a Fill-in-the-Blank question
export const addFillInCorrectChoice = async (questionId: string, choice: string) => {
    const response = await axiosWithCredentials.post(`${FILL_IN_THE_BLANK_API}/${questionId}/choices`, { choice });
    return response.data;
};

// Remove a correct choice from a Fill-in-the-Blank question
export const removeFillInCorrectChoice = async (questionId: string, choice: string) => {
    const response = await axiosWithCredentials.delete(`${FILL_IN_THE_BLANK_API}/${questionId}/choices/${choice}`);
    return response.data;
};

// Update an existing Fill-in-the-Blank question
export const updateFillInQuestion = async (questionId: string, questionUpdates: any) => {
    const response = await axiosWithCredentials.put(`${FILL_IN_THE_BLANK_API}/${questionId}`, questionUpdates);
    return response.data;
};


//find question by id but since different types could have same id, check type to know which collection check
export const findQuestionById = async (questionId: string, type: string) => {
    let response;
    if (type === "MCQ") {
        response = await axiosWithCredentials.get(`${MCQ_API}/${questionId}`);
    } else if (type === "FILL_IN_THE_BLANK") {
        response = await axiosWithCredentials.get(`${FILL_IN_THE_BLANK_API}/${questionId}`);
    } else if (type === "TRUE_FALSE") {
        response = await axiosWithCredentials.get(`${TRUE_FALSE_API}/${questionId}`);
    }
    if (!response) {
        throw new Error("Failed to fetch question: response is undefined");
    }
    return response.data;
}
