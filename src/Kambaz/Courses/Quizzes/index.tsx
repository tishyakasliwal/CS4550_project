import { Button, ListGroup, Modal } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import QuizzesControlButtons from "./QuizzesControlButtons";

import { GoRocket } from "react-icons/go";
import { Link, useParams } from "react-router-dom";
import "../../styles.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import QuizzesControls from "./QuizzesControls";
import { deleteQuiz, updateQuiz } from "./reducer";
import { useNavigate } from "react-router-dom";


export default function Quizzes() {
  const { cid } = useParams<{ cid: string }>();
  const quizzes = useSelector((state: any) => state.quizzesReducer.quizzes);
  const courseQuizzes = quizzes.filter((quiz: any) => quiz.course === cid);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<any>(null);
  const navigate = useNavigate();

  const handleDelete = (quiz: any) => {
    setSelectedQuiz(quiz);
    setShowModal(true);
  };

  const confirmDelete = () => {
    dispatch(deleteQuiz(selectedQuiz._id));
    setShowModal(false);
  };

  const handleEdit = (quiz: any) => {
    navigate(`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}`);
  };

  const handlePublish = (quiz: any) => {
    dispatch(updateQuiz({ ...quiz, published: !quiz.published }));
  };
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  return (
    <div id="wd-quizzes">
      <QuizzesControls /><br /><br /><br /><br />

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
  