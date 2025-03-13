import { Form, Button, Row, Col } from "react-bootstrap";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addAssignment, updateAssignment } from "./reducer";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";

export default function AssignmentEditor() {
  const { cid, aid } = useParams<{ cid: string; aid: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const assignments = useSelector((state: any) => state.assignmentsReducer.assignments);
  const existingAssignment = assignments.find((assignment: any) => assignment._id === aid);
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const [assignment, setAssignment] = useState({
    _id: existingAssignment?._id || uuidv4(),
    title: existingAssignment?.title || "",
    course: cid,
    description: existingAssignment?.description || "",
    points: existingAssignment?.points || 0,
    dueDate: existingAssignment?.dueDate || "",
    availableDate: existingAssignment?.availableDate || "",
    group: existingAssignment?.group || "Assignments",
    displayGrade: existingAssignment?.displayGrade || "points",
    submissionType: existingAssignment?.submissionType || "online",
  });

  useEffect(() => {
    if (existingAssignment) {
      setAssignment(existingAssignment);
    }
  }, [existingAssignment]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setAssignment((prevAssignment) => ({
      ...prevAssignment,
      [id]: value,
    }));
  };

  const handleSave = () => {
    
    if (aid === "new") { 
      dispatch(addAssignment(assignment));
    } else {
      dispatch(updateAssignment(assignment));
    }
    navigate(`/Kambaz/Courses/${cid}/Assignments`);
  };

  if (!assignment) {
    return <div>Assignment not found</div>;
  }

  return (
    <div id="wd-assignments-editor" className="p-3">
      {currentUser?.role === "FACULTY" && (
        <Form>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Assignment Name</Form.Label>
            <Form.Control
              type="text"
              value={assignment.title}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={assignment.description}
              onChange={handleChange}
            />
          </Form.Group>

          <Row className="mb-3">
            <Form.Label column sm={2} htmlFor="points">
              Points
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="number"
                id="points"
                value={assignment.points}
                onChange={handleChange}
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Form.Label column sm={2} htmlFor="dueDate">
              Due Date
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="date"
                id="dueDate"
                value={assignment.dueDate}
                onChange={handleChange}
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Form.Label column sm={2} htmlFor="availableDate">
              Available Date
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="date"
                id="availableDate"
                value={assignment.availableDate}
                onChange={handleChange}
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Form.Label column sm={2} htmlFor="group">
              Assignment Group
            </Form.Label>
            <Col sm={10}>
              <Form.Select
                id="group"
                value={assignment.group}
                onChange={handleChange}
              >
                <option value="Assignments">Assignments</option>
                <option value="Quizzes">Quizzes</option>
                <option value="Exams">Exams</option>
              </Form.Select>
            </Col>
          </Row>

          <Row className="mb-3">
            <Form.Label column sm={2} htmlFor="displayGrade">
              Display Grade
            </Form.Label>
            <Col sm={10}>
              <Form.Select
                id="displayGrade"
                value={assignment.displayGrade}
                onChange={handleChange}
              >
                <option value="percentage">Percentage</option>
                <option value="points">Points</option>
                <option value="letter">Letter Grade</option>
                <option value="gpa">GPA</option>
                <option value="pass_fail">Pass/Fail</option>
              </Form.Select>
            </Col>
          </Row>

          <Row className="mb-3">
            <Form.Label column sm={2} htmlFor="submissionType">
              Submission Type
            </Form.Label>
            <Col sm={10}>
              <Form.Select
                id="submissionType"
                value={assignment.submissionType}
                onChange={handleChange}
              >
                <option value="online">Online</option>
                <option value="paper">Paper</option>
              </Form.Select>
            </Col>
          </Row>

          <div className="d-flex justify-content-end">
          <Link to={`/Kambaz/Courses/${cid}/Assignments`}> <Button variant="secondary" className="me-2">Cancel</Button> </Link>
          <Button variant="primary" onClick={handleSave}>
          Save
          </Button>
          </div>
        </Form>
      )}
    </div>
  );
}

