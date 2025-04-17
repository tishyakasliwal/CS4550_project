import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as quizzesClient from "./client"; // Import client for quizzes
import { Button, Form } from "react-bootstrap";

export default function QuizPreview() {
  const { quizId } = useParams(); // Get quiz ID from URL
  const [quiz, setQuiz] = useState<any>(null); // Store quiz details
  const [questions, setQuestions] = useState<any[]>([]); // Store combined questions
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Track current question
  const [answers, setAnswers] = useState<{ [key: string]: any }>({}); // Store user answers
  const [score, setScore] = useState<number | null>(null); // Store total score after submission

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        // Fetch quiz details (including title)
        const quizData = await quizzesClient.findQuizById(quizId!);
        setQuiz(quizData);

        const { mcqQuestions, fillInQuestions, tfQuestions } =
          await quizzesClient.findQuestionsForQuiz(quizId!); // Fetch questions by type

        // Combine all questions into a single array with a `type` field
        const combinedQuestions = [
          ...mcqQuestions.map((q: any) => ({ ...q, type: "MCQ" })),
          ...fillInQuestions.map((q: any) => ({ ...q, type: "FILL_IN_THE_BLANK" })),
          ...tfQuestions.map((q: any) => ({ ...q, type: "TRUE_FALSE" })),
        ];

        setQuestions(combinedQuestions);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    if (quizId) {
      fetchQuestions();
    }
  }, [quizId]);

  const handleAnswerChange = (questionKey: string, answer: any) => {
    setAnswers({ ...answers, [questionKey]: answer });
  };

  const handleSubmit = () => {
    let totalScore = 0;

    questions.forEach((question) => {
      const questionKey = `${question.type}-${question._id}`; // Combine type and ID since questions of diff types may have same id
      const userAnswer = answers[questionKey];
      console.log("User Answer:", userAnswer);
      if (question.type === "MCQ") {
        // For multiple-choice questions
        const correctChoice = question.choices.find((choice: any) => choice.isCorrect);
        if (correctChoice && correctChoice.text === userAnswer) {
          totalScore += question.points;
        }
      } else if (question.type === "FILL_IN_THE_BLANK") {
        // For fill-in-the-blank questions
        if (question.correctChoices.includes(userAnswer?.toLowerCase())) {
          totalScore += question.points;
        }
      } else if (question.type === "TRUE_FALSE") {
        // For true/false questions
        if (question.correctAnswer === userAnswer) {
          totalScore += question.points;
        }
      }
    });

    setScore(totalScore);
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="quiz-preview">
      {quiz && <h2>{quiz.title}</h2>}

      {currentQuestion && (
        <div className="question-section">
          <h4>{currentQuestion.question}</h4>
          <p>Points: {currentQuestion.points}</p>

          {currentQuestion.type === "MCQ" && (
            <div className="options">
              {currentQuestion.choices.map((choice: any) => (
                <Form.Check
                  key={choice.text}
                  type="radio"
                  name={`question-${currentQuestion._id}`}
                  label={choice.text}
                  value={choice.text}
                  onChange={(e) => handleAnswerChange(`${currentQuestion.type}-${currentQuestion._id}`, e.target.value)}
                  checked={answers[`${currentQuestion.type}-${currentQuestion._id}`] === choice.text}
                />
              ))}
            </div>
          )}

          {currentQuestion.type === "FILL_IN_THE_BLANK" && (
            <Form.Control
              type="text"
              placeholder="Enter your answer"
              value={answers[`${currentQuestion.type}-${currentQuestion._id}`] || ""}
              onChange={(e) => handleAnswerChange(`${currentQuestion.type}-${currentQuestion._id}`, e.target.value)}
            />
          )}

          {currentQuestion.type === "TRUE_FALSE" && (
            <div className="options">
              <Form.Check
                type="radio"
                name={`question-${currentQuestion._id}`}
                label="True"
                value="True"
                onChange={(e) => handleAnswerChange(`${currentQuestion.type}-${currentQuestion._id}`, e.target.value)}
                checked={answers[`${currentQuestion.type}-${currentQuestion._id}`] === "True"}
              />
              <Form.Check
                type="radio"
                name={`question-${currentQuestion._id}`}
                label="False"
                value="False"
                onChange={(e) => handleAnswerChange(`${currentQuestion.type}-${currentQuestion._id}`, e.target.value)}
                checked={answers[`${currentQuestion.type}-${currentQuestion._id}`] === "False"}
              />
            </div>
          )}
        </div>
      )}

      <div className="navigation-buttons d-flex justify-content-between mt-3">
        <Button
          variant="secondary"
          onClick={() => setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0))}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </Button>
        <Button
          variant="secondary"
          onClick={() =>
            setCurrentQuestionIndex((prev) => Math.min(prev + 1, questions.length - 1))
          }
          disabled={currentQuestionIndex === questions.length - 1}
        >
          Next
        </Button>
      </div>

      {currentQuestionIndex === questions.length - 1 && (
        <Button variant="primary" onClick={handleSubmit} className="mt-3">
          Submit
        </Button>
      )}

      {score !== null && (
        <div className="score-section mt-4">
          <h3>Total Score: {score}</h3>
        </div>
      )}
    </div>
  );
}