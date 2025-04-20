/* eslint-disable react-hooks/exhaustive-deps */
import { Button, ListGroup } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { fetchQuizAttempts, findQuestionsForQuiz } from "./client";
import { FaCheck, FaTimes } from "react-icons/fa";

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

  // Pull current user (to get studentId)
  const studentId = useSelector(
    (state: any) => state.accountReducer.currentUser._id
  );

  // Find the quiz that matches the URL quizId
  const quiz = quizzes.find((q: any) => q._id === quizId);

  // map from questionId -> question text
  const [questionMap, setQuestionMap] = useState<Record<string,string>>({});

  // Your existing state
  const [latestAttempt, setLatestAttempt] = useState<any>(null);
  const [attemptsLeft, setAttemptsLeft] = useState<number>(1);

  // Load past attempts
  useEffect(() => {
    async function loadAttempts() {
      if (!studentId || !quiz) return;

      const all = await fetchQuizAttempts(quizId!, studentId);
      if (all.length) {
        setLatestAttempt(all[0]); // most recent
      }
      const used = all.length;
      const allowed =
        quiz.multipleAttempts === "Yes" ? quiz.numOfAttemps : 1;
      setAttemptsLeft(Math.max(0, allowed - used));
    }
    loadAttempts();
  }, [quizId, studentId, quiz?.multipleAttempts, quiz?.numOfAttemps]);

  // Fetch question texts
  useEffect(() => {
    async function loadQuestions() {
      if (!quizId) return;

      const {
        mcqQuestions = [],
        fillInQuestions = [],
        tfQuestions = [],
      } = await findQuestionsForQuiz(quizId!);

      const allQs = [...mcqQuestions, ...fillInQuestions, ...tfQuestions];
      const map: Record<string,string> = {};
      allQs.forEach((q: any) => {
        map[q._id] = q.question;
      });
      setQuestionMap(map);
    }
    loadQuestions();
  }, [quizId]);

  // Handle case where quiz doesn’t exist
  if (!quiz) {
    return <div className="m-3">Quiz not found.</div>;
  }

  // Handler: Navigate to the quiz‐taking screen
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

      {latestAttempt && (
        <div className="mb-4">
          <strong>Last Attempt:</strong>{" "}
          {new Date(latestAttempt.takenAt).toLocaleString()}
          <br />
          <strong>Score:</strong> {latestAttempt.score}/{quiz.points}

          <div className="mt-3">
            <strong>Your Responses:</strong>
            <ListGroup className="mt-2">
              {latestAttempt.answers.map((ans: any) => (
                <ListGroup.Item
                  key={ans._id}
                  className="d-flex justify-content-between align-items-center"
                >
                  <div>
                    { /* question text or fallback ID */ }
                    {questionMap[ans.question] || ans.question}
                    <br />
                    <small>Your answer: {String(ans.selectedAnswer)}</small>
                  </div>
                  <div>
                    {ans.correct
                      ? <FaCheck className="text-success" />
                      : <FaTimes className="text-danger" />}
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        </div>
      )}

      {/* Start Quiz button & Attempts */}
      <Button
        variant="primary"
        onClick={handleStartQuiz}
        disabled={attemptsLeft === 0}
      >
        {attemptsLeft > 0
          ? `Start Quiz (${attemptsLeft} attempt${attemptsLeft > 1 ? "s" : ""} left)`
          : "No Attempts Left"}
      </Button>
    </div>
  );
}