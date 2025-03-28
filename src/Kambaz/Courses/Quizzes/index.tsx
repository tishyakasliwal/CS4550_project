import { Button, ListGroup, Modal } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import QuizzesControlButtons from "./QuizzesControlButtons";
import { LuTrash } from "react-icons/lu";
import { GoRocket } from "react-icons/go";
import { useParams } from "react-router-dom";
import "../../styles.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import QuizzesControls from "./QuizzesControls";
import { deleteQuiz } from "./reducer";

export default function Quizzes() {
  const { cid } = useParams<{ cid: string }>();
  const quizzes = useSelector((state: any) => state.quizzesReducer.quizzes);
  const courseQuizzes = quizzes.filter((quiz: any) => quiz.course === cid);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<any>(null);
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const handleDelete = (quiz: any) => {
    setSelectedQuiz(quiz);
    setShowModal(true);
  };

  const confirmDelete = () => {
    dispatch(deleteQuiz(selectedQuiz._id));
    setShowModal(false);
  };
  

  return (
    <div id="wd-quizzes">
      <QuizzesControls /><br /><br /><br /><br />

      <ListGroup className="rounded-0" id="wd-modules">
        <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" /> Assignment Quizzes 
          </div>

          <ListGroup id="wd-quiz-list" className="wd-lessons rounded-0">
            {courseQuizzes.map((quiz: any) => (
              <ListGroup.Item key={quiz._id} className="wd-quiz-list-item">
                <a href={`#/Kambaz/Courses/${cid}/Quizzes/${quiz._id}`} className="wd-quiz-link">
                <GoRocket className="me-2 fs-3" />
                  {quiz.title} <QuizzesControlButtons />
                </a>
                <p> <b> {quiz.availability} </b> | <b> Due </b> {quiz.dueDate} | {quiz.points} pts | {quiz.quesNum} Questions</p>
                {currentUser?.role === "FACULTY" && (
                  <Button variant="danger" size="sm" className="float-end" onClick={() => handleDelete(quiz)}>
                    <LuTrash />
                  </Button>
                )}
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
  