import { Button, ListGroup, Modal } from "react-bootstrap";
import AssignmentControls from "./AssignmentsControls";
import { BsGripVertical } from "react-icons/bs";
import AssignmentsBannerButtons from "./AssignmentsBannerButtons";
import AssignmentsControlButtons from "./AssignmentsControlButtons";
import { LuNotepadText, LuTrash } from "react-icons/lu";
import { useParams } from "react-router-dom";
import "../../styles.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { deleteAssignment } from "./reducer";

export default function Assignments() {
  const { cid } = useParams<{ cid: string }>();
  const assignments = useSelector((state: any) => state.assignmentsReducer.assignments);
  const courseAssignments = assignments.filter((assignment: any) => assignment.course === cid);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null);
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const handleDelete = (assignment: any) => {
    setSelectedAssignment(assignment);
    setShowModal(true);
  };

  const confirmDelete = () => {
    dispatch(deleteAssignment(selectedAssignment._id));
    setShowModal(false);
  };
  

  return (
    <div id="wd-assignments">
      <AssignmentControls /><br /><br /><br /><br />

      <ListGroup className="rounded-0" id="wd-modules">
        <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" /> Assignments <AssignmentsBannerButtons />
          </div>

          <ListGroup id="wd-assignment-list" className="wd-lessons rounded-0">
            {courseAssignments.map((assignment: any) => (
              <ListGroup.Item key={assignment._id} className="wd-assignment-list-item">
                <a href={`#/Kambaz/Courses/${cid}/Assignments/${assignment._id}`} className="wd-assignment-link">
                  <BsGripVertical className="me-2 fs-3" /> <LuNotepadText className="me-2 fs-3" />
                  {assignment.title} <AssignmentsControlButtons />
                </a>
                <p> <b> Not Available </b> until {assignment.availableDate} | <b> Due </b> {assignment.dueDate} | {assignment.points} points</p>
                {currentUser?.role === "FACULTY" && (
                  <Button variant="danger" size="sm" className="float-end" onClick={() => handleDelete(assignment)}>
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
        <Modal.Body>Are you sure you want to delete this assignment?</Modal.Body>
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
  