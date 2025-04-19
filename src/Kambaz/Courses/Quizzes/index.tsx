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

export default function Quizzes() {
  const { cid } = useParams<{ cid?: string }>();
  const quizzes = useSelector((state: any) => state.quizzesReducer.quizzes);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<any>(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
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
  
  if (loading) {
    return <div>Loading assignments...</div>;
  }

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
            {courseQuizzes.map((quiz: any) => (
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
                  // Show control buttons only for faculty
                  <QuizzesControlButtons
                    quiz={quiz}
                    onEdit={() => handleEdit(quiz)}
                    onDelete={() => handleDelete(quiz)}
                    onPublish={() => handlePublish(quiz)}
                  />
                )}

                <p> <b> {quiz.availability} </b> | <b> Due </b> {quiz.dueDate} | {quiz.points} pts | {quiz.quesNum} Questions</p>
                {/* {currentUser?.role === "FACULTY" && (
                  <Button variant="danger" size="sm" className="float-end" onClick={() => handleDelete(quiz)}>
                    <LuTrash />
                  </Button>
                )} */}
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
