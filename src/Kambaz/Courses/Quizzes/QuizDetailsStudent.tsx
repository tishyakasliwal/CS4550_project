import { Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

interface RouteParams {
  cid: string;
  quizId: string;
  [key: string]: string | undefined;
}

export default function QuizDetailsStudent() {
  const { cid, quizId } = useParams<RouteParams>();
  const navigate = useNavigate();

  // Pull the quiz list from reducer
  const quizzes = useSelector((state: any) => state.quizzesReducer.quizzes);

  // Find the quiz that matches the URL quizId
  const quiz = quizzes.find((q: any) => q._id === quizId);

  // Handle case where quiz doesn’t exist
  if (!quiz) {
    return <div className="m-3">Quiz not found.</div>;
  }

  // Handler: Navigate to the quiz-taking screen
  const handleStartQuiz = () => {
    navigate(`/Kambaz/Courses/${cid}/Quizzes/${quizId}/attempt`);
  };

  return (
    <div className="m-4">
      <h2>{quiz.title}</h2>

      {/* Show any relevant info about the quiz */}
      <p>
        <strong>Due:</strong> {quiz.dueDate} <br />
        <strong>Points:</strong> {quiz.points} <br />
        <strong>Number of Questions:</strong> {quiz.quesNum}
      </p>

      {/* Start Quiz button */}
      <Button variant="primary" onClick={handleStartQuiz}>
        Start Quiz
      </Button>
    </div>
  );
}
