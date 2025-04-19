import { Button, ListGroup, Modal } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import QuizzesControlButtons from "./QuizzesControlButtons";
import { GoRocket } from "react-icons/go";
import { Link, useParams } from "react-router-dom";
import "../../styles.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import QuizzesControls from "./QuizzesControls";
import { deleteQuiz, setQuizzes, updateQuiz } from "./reducer";
import { useNavigate } from "react-router-dom";
import * as quizzesClient from "./client";
import { FaBan } from "react-icons/fa";
import GreenCheckmark from "./GreenCheckmark";


export default function Quizzes() {
  const { cid } = useParams<{ cid?: string }>();
  const quizzes = useSelector((state: any) => state.quizzesReducer.quizzes);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<any>(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [quizzesWithDetails, setQuizzesWithDetails] = useState<any[]>([]);

  const courseQuizzes = quizzes.filter((quiz: any) => {
    const isInCourse = quiz.course === cid;
    if (currentUser?.role === "STUDENT") {
      return isInCourse && quiz.published === true;
    }
    return isInCourse;
  });

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        if (cid) {
          console.log("Fetching quizzes for course:", cid);
          const courseQuizzes = await quizzesClient.findQuizzesForCourse(cid);
          console.log("Fetched quizzes:", courseQuizzes);
          dispatch(setQuizzes(courseQuizzes));
        }
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, [cid, dispatch]);

  // question details for each quiz
  useEffect(() => {
    const fetchQuizDetails = async () => {
      if (courseQuizzes.length === 0) return;

      try {
        const updatedQuizzes = await Promise.all(
          courseQuizzes.map(async (quiz: any) => {
            try {
              // fetch questions for this quiz
              const response = await quizzesClient.findQuestionsForQuiz(quiz._id);
              const mcqQuestions = response.mcqQuestions || [];
              const fillInQuestions = response.fillInQuestions || [];
              const tfQuestions = response.tfQuestions || [];

              // total number of questions
              const questionCount = mcqQuestions.length + fillInQuestions.length + tfQuestions.length;

              // calculate total points from questions
              const allQuestions = [...mcqQuestions, ...fillInQuestions, ...tfQuestions];
              const totalPoints = allQuestions.reduce((sum, q) => sum + (q.points || 0), 0);

              // quiz with calculated details
              return {
                ...quiz,
                quesNum: questionCount,
                points: totalPoints
              };
            } catch (error) {
              console.error(`Error fetching questions for quiz ${quiz._id}:`, error);
              return quiz;
            }
          })
        );

        setQuizzesWithDetails(updatedQuizzes);
      } catch (error) {
        console.error("Error updating quizzes with details:", error);
      }
    };

    fetchQuizDetails();
  }, [courseQuizzes]);

  const handleDelete = (quiz: any) => {
    setSelectedQuiz(quiz);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      if (selectedQuiz) {
        await quizzesClient.deleteQuiz(selectedQuiz._id);
        dispatch(deleteQuiz(selectedQuiz._id));
        setQuizzes(quizzes.filter((q: any) => q._id !== selectedQuiz._id));
      }
    } catch (error) {
      console.error("Error deleting quiz:", error);
    } finally {
      setShowModal(false);
    }
  };

  const handleEdit = (quiz: any) => {
    navigate(`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}/edit`);
  };

  const handlePublish = async (quiz: any) => {
    try {
      const updatedQuiz = { ...quiz, published: !quiz.published };
      await quizzesClient.updateQuiz(updatedQuiz._id, updatedQuiz);
      dispatch(updateQuiz(updatedQuiz));
    } catch (error) {
      console.error("Error updating quiz publish status:", error);
    }
  };

  const formatDate = (datetime: string) => {
    const date = new Date(datetime);
    return date.toLocaleDateString();
  };

  const getQuizAvailability = (quiz: any) => {
    const now = new Date();
    const start = new Date(quiz.availableDate);
    const end = new Date(quiz.untilDate);
    if (now < start) {
      return `Not Available until ${start.toLocaleString()}`;
    } else if (now > end) {
      return "Closed";
    } else {
      return "Available";
    }

  }

  if (loading) {
    return <div>Loading assignments...</div>;
  }

  const displayQuizzes = quizzesWithDetails.length > 0 ? quizzesWithDetails : courseQuizzes;

  return (
    <div id="wd-quizzes">
      {currentUser?.role === "FACULTY" && <QuizzesControls />}
      <br /><br /><br /><br />

      <ListGroup className="rounded-0" id="wd-quizzes">
        <ListGroup.Item className="wd-quizzes p-0 mb-5 fs-5 border-gray">

          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" /> Assignment Quizzes
          </div>

          <ListGroup id="wd-quiz-list" className="wd-lessons rounded-0">
            {displayQuizzes.map((quiz: any) => (
              <ListGroup.Item key={quiz._id} className="wd-quiz-list-item">
                <a href={`#/Kambaz/Courses/${cid}/Quizzes/${quiz._id}`} className="wd-quiz-link"> </a>
                <GoRocket className="me-2 fs-3" />


                {currentUser?.role === "STUDENT" ? (
                  <Link
                    to={`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}/start`}
                    className="wd-quiz-link text-decoration-none"
                  >
                    {quiz.title}
                  </Link>
                ) : (
                  <Link
                    to={`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}`}
                    className="wd-quiz-link text-decoration-none"
                  >
                    {quiz.title}
                  </Link>
                )} {currentUser?.role === "FACULTY" && (
                  <>

                    <QuizzesControlButtons
                      quiz={quiz}
                      onEdit={() => handleEdit(quiz)}
                      onDelete={() => handleDelete(quiz)}
                      onPublish={() => handlePublish(quiz)}
                    />
                    <span
                    className="publish-status me-2"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handlePublish(quiz);
                      }
                    }
                  >
                    {quiz.published ?
                      <GreenCheckmark /> :
                      <FaBan className="text-danger" />
                    }
                  </span>
                  </>
                )}

                <p> <b> {getQuizAvailability(quiz)} </b> | <b> Due </b> {formatDate(quiz.dueDate)} | {quiz.points} pts | {quiz.quesNum} Questions
                {currentUser?.role === "STUDENT" && quiz.score !== undefined && (
                      <span className="ms-2">| <b>Score</b> {quiz.score}</span>
                    )} </p>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this quiz?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
