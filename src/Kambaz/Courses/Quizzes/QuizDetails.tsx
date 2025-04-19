import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { FaEdit } from "react-icons/fa"; 

export default function QuizDetails() {
  const { quizId, cid } = useParams<{ quizId: string; cid: string }>();
  const quiz = useSelector((state: any) =>
    state.quizzesReducer.quizzes.find((q: any) => q._id === quizId)
  );
  const navigate = useNavigate();

  if (!quiz) {
    return <div>Quiz not found</div>;
  }

  const handleEditClick = () => {
    navigate(`/Kambaz/Courses/${cid}/Quizzes/${quizId}/edit`);
  };
  const handlePreviewClick = () => {
    navigate(`/Kambaz/Courses/${cid}/Quizzes/${quizId}/preview`);
  };


  return (
    <div className="quiz-details">
      {/* Add the Edit button above the title */}
      <div className="d-flex justify-content-center mb-4">
        <Button
          variant="secondary"
          size="lg"
          className="me-3"
          onClick={handlePreviewClick}
        >
          Preview
        </Button>
        <Button
          variant="secondary"
          size="lg"
          onClick={handleEditClick}
        >
          <FaEdit className="me-2" /> Edit
        </Button>
      </div>
      <div className="text-left mb-3">
        <h2>{quiz.title}</h2>
      </div>

      <div className="w-75">
        {[
          { label: "Quiz Type", value: quiz.quizType },
          { label: "Points", value: quiz.points },
          { label: "Assignment Group", value: quiz.assignmentGroup },
          { label: "Shuffle Answers", value: quiz.shuffleAnswers },
          { label: "Time Limit", value: `${quiz.timeLimit} minutes` },
          { label: "Multiple Attempts", value: quiz.multipleAttempts },
          { label: "View Responses", value: quiz.viewResults },
          { label: "Show Correct Answers", value: quiz.showCorrectAnswers },
          { label: "One Question at a Time", value: quiz.oneQuestionAtATime },
          { label: "Requires Respondus LockDown Browser", value: "No" },
          { label: "Require to View Quiz Results", value: quiz.viewResults },
          { label: "Webcam Required", value: quiz.webcamRequired },
          { label: "Lock Questions After Answering", value: quiz.lockQuestionsAfterAnswering },
        ].map((item, index) => (
          <div key={index} className="d-flex justify-content-between mb-2">
            <div className="text-start" style={{ width: "40%" }}>
              <b>{item.label}:</b>
            </div>
            <div className="text-start" style={{ width: "60%" }}>
              {item.value}
            </div>
          </div>
        ))}
      </div>
    
      <div className="d-flex justify-content-between mt-4 border-top pt-3">
        <div className="d-flex flex-column text-center">
          <p className="mb-1"><b>Due</b></p>
          <p>{quiz.dueDate}</p>
        </div>
        <div className="d-flex flex-column text-center">
          <p className="mb-1"><b>For</b></p>
          <p>Everyone</p>
        </div>
        <div className="d-flex flex-column text-center">
          <p className="mb-1"><b>Available From</b></p>
          <p>{quiz.availableDate}</p>
        </div>
        <div className="d-flex flex-column text-center">
          <p className="mb-1"><b>Until</b></p>
          <p>{quiz.untilDate}</p>
        </div>
      </div>
    </div>
  );
}