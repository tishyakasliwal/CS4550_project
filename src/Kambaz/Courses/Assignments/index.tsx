import { Button, ListGroup, Modal } from "react-bootstrap";
import AssignmentControls from "./AssignmentsControls";
import { BsGripVertical } from "react-icons/bs";
import AssignmentsBannerButtons from "./AssignmentsBannerButtons";
import AssignmentsControlButtons from "./AssignmentsControlButtons";
import { LuNotepadText, LuTrash } from "react-icons/lu";
import { useParams } from "react-router-dom";
import "../../styles.css";
import { useState, useEffect } from "react";
import * as assignmentsClient from "./client";
import { useSelector } from "react-redux";
export default function Assignments() {
  const { cid } = useParams<{ cid: string }>();
  const [assignments, setAssignments] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        if (cid) {
          const courseAssignments = await assignmentsClient.fetchAssignmentsForCourse(cid);
        
          setAssignments(courseAssignments);
        }
      } catch (error) {
        console.error("Error fetching assignments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [cid]);

  const handleDelete = (assignment: any) => {
    setSelectedAssignment(assignment);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      if (selectedAssignment) {
        await assignmentsClient.deleteAssignment(selectedAssignment._id);
        setAssignments(assignments.filter((a) => a._id !== selectedAssignment._id));
      }
    } catch (error) {
      console.error("Error deleting assignment:", error);
    } finally {
      setShowModal(false);
    }
  };
  const formatDate = (datetime: string) => {
    const date = new Date(datetime);
    return date.toLocaleDateString(); // Formats as "MM/DD/YYYY" or "DD/MM/YYYY" based on locale
  };

  if (loading) {
    return <div>Loading assignments...</div>;
  }

  return (
    <div id="wd-assignments">
      <AssignmentControls />
      <br />
      <br />
      <br />
      <br />

      <ListGroup className="rounded-0" id="wd-modules">
        <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" /> Assignments <AssignmentsBannerButtons />
          </div>

          <ListGroup id="wd-assignment-list" className="wd-lessons rounded-0">
            {assignments.map((assignment: any) => (
              <ListGroup.Item key={assignment._id} className="wd-assignment-list-item">
                <a href={`#/Kambaz/Courses/${cid}/Assignments/${assignment._id}`} className="wd-assignment-link">
                  <BsGripVertical className="me-2 fs-3" /> <LuNotepadText className="me-2 fs-3" />
                  {assignment.title} <AssignmentsControlButtons />
                </a>
                <p>
                  <b>Not Available</b> until {formatDate(assignment.availableDate)} | <b>Due</b> {formatDate(assignment.dueDate)} | {assignment.points} points
                </p>
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