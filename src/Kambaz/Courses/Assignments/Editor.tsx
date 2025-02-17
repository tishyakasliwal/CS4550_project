import { Form, Button, Row, Col } from "react-bootstrap";
import { useParams} from "react-router-dom";
import { assignments } from "../../Database";

export default function AssignmentEditor() {
  const { cid, aid } = useParams<{ cid: string; aid: string }>();
  const assignment = assignments.find((assignment) => assignment._id === aid);

  if (!assignment) {
    return <div>Assignment not found</div>;
  }

  return (
    <div id="wd-assignments-editor" className="p-3">
      <Form>
        <Form.Group className="mb-3" controlId="wd-name">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control type="text" defaultValue={assignment.title} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="wd-description">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} defaultValue={assignment.description} />
        </Form.Group>

        <Row className="mb-3">
          <Form.Label column sm={2} htmlFor="wd-points">Points</Form.Label>
          <Col sm={10}>
            <Form.Control type="number" id="wd-points" defaultValue={assignment.points} />
          </Col>
        </Row>

        <Row className="mb-3">
          <Form.Label column sm={2} htmlFor="wd-due-date">Due Date</Form.Label>
          <Col sm={10}>
            <Form.Control type="date" id="wd-due-date" defaultValue={assignment.dueDate} />
          </Col>
        </Row>

        <Row className="mb-3">
          <Form.Label column sm={2} htmlFor="wd-available-date">Available Date</Form.Label>
          <Col sm={10}>
            <Form.Control type="date" id="wd-available-date" defaultValue={assignment.availableDate} />
          </Col>
        </Row>

        <Row className="mb-3">
          <Form.Label column sm={2} htmlFor="wd-assignment-group">Assignment Group</Form.Label>
          <Col sm={10}>
            <Form.Select id="wd-assignment-group" defaultValue={assignment.group}>
              <option value="Assignments">Assignments</option>
              <option value="Quizzes">Quizzes</option>
              <option value="Exams">Exams</option>
            </Form.Select>
          </Col>
        </Row>

        <Row className="mb-3">
          <Form.Label column sm={2} htmlFor="wd-display-grade">Display Grade</Form.Label>
          <Col sm={10}>
            <Form.Select id="wd-display-grade" defaultValue={assignment.displayGrade}>
              <option value="percentage">Percentage</option>
              <option value="points">Points</option>
              <option value="letter">Letter Grade</option>
              <option value="gpa">GPA</option>
              <option value="pass_fail">Pass/Fail</option>
            </Form.Select>
          </Col>
        </Row>

        <Row className="mb-3">
          <Form.Label column sm={2} htmlFor="wd-submission-type">Submission Type</Form.Label>
          <Col sm={10}>
            <Form.Select id="wd-submission-type" defaultValue={assignment.submissionType}>
              <option value="online">Online</option>
              <option value="paper">Paper</option>
            </Form.Select>
          </Col>
        </Row>

        <div className="d-flex justify-content-end">
          <Button onClick={() => {`/Kambaz/Courses/${cid}/Assignments`}} variant="secondary" className="me-2">Cancel</Button>
          <Button onClick={() => {`/Kambaz/Courses/${cid}/Assignments`}} variant="primary">Save</Button>
        </div>
      </Form>
    </div>
  );
}