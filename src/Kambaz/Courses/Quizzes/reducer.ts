import { createSlice } from "@reduxjs/toolkit";
import { quizzes } from "../../Database";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  quizzes: quizzes || [],
  // quizzes: [], 
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes: (state, { payload: quizzes }) => {
      state.quizzes = quizzes;
    },

    addQuiz: (state, { payload: quiz }) => {
      const newQuiz: any = {
        _id: uuidv4(),
        title: quiz.title,
        course: quiz.course,
        availability: quiz.availability,
        dueDate: quiz.dueDate,
        points: quiz.points,
        quesNum: quiz.quesNum,
        score: quiz.score,
        quizType: quiz.quizType,
        assignmentGroup: quiz.assignmentGroup,
        shuffleAnswers: quiz.shuffleAnswers,
        timeLimit: quiz.timeLimit,
        multipleAttempts: quiz.multipleAttempts,
        viewResponses: quiz.viewResponses,
        oneQuestionAtATime: quiz.oneQuestionAtATime,
        webcamRequired: quiz.webcamRequired,
        lockQuestionsAfterAnswering: quiz.lockQuestionsAfterAnswering,
        availableDate: quiz.availableDate,
        untilDate: quiz.untilDate,
        for: quiz.for,
        published: quiz.published,
      };
      state.quizzes = [...state.quizzes, newQuiz] as any;
    },
    deleteQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.filter(
        (q: any) => q._id !== quizId
      );
    },
    updateQuiz: (state, { payload: quiz }) => {
      state.quizzes = state.quizzes.map((q: any) =>
        q._id === quiz._id ? quiz : q
      ) as any;
    },
    editQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.map((q: any) =>
        q._id === quizId ? { ...q, editing: true } : q
      ) as any;
    },
    
    publishQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.map((q: any) =>
        q._id === quizId ? { ...q, published: !q.published } : q
      ) as any;
    },

  },
});

export const { setQuizzes, addQuiz, deleteQuiz, updateQuiz, editQuiz, publishQuiz } =
  quizzesSlice.actions;
export default quizzesSlice.reducer;