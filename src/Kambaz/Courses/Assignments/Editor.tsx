import { Form, Button, Row, Col } from "react-bootstrap";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import * as assignmentsClient from "./client";

export default function AssignmentEditor() {
  const { cid, aid } = useParams<{ cid: string; aid: string }>();
  const navigate = useNavigate();

  const [assignment, setAssignment] = useState({
    _id: "",
    title: "",
    course: cid,
    description: "",
    points: 0,
    dueDate: "",
    availableDate: "",
    group: "Assignments",
    displayGrade: "points",
    submissionType: "online",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAssignment = async () => {
      if (aid && aid !== "new") {
        try {
          const existingAssignment = await assignmentsClient.fetchAssignmentById(aid);
          setAssignment(existingAssignment);
        } catch (err) {
          console.error("Error fetching assignment:", err);
          setError("Failed to load assignment.");
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchAssignment();
  }, [aid]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setAssignment((prevAssignment) => ({
      ...prevAssignment,
      [id]: value,
    }));
  };

  const handleSave = async () => {
    try {
      if (aid === "new") {
        await assignmentsClient.createAssignment(assignment);
      } else {
        await assignmentsClient.updateAssignment(assignment._id, assignment);
      }
      navigate(`/Kambaz/Courses/${cid}/Assignments`);
    } catch (err) {
      console.error("Error saving assignment:", err);
      setError("Failed to save assignment.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-danger">{error}</div>;
  }

  return (
    <div id="wd-assignments-editor" className="p-3">
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
          <Link to={`/Kambaz/Courses/${cid}/Assignments`}>
            <Button variant="secondary" className="me-2">Cancel</Button>
          </Link>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}