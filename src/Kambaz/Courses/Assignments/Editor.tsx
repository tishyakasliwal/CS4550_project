

import { Form, Button, Row, Col } from "react-bootstrap";

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor" className="p-3">
      <Form>
        <Form.Group className="mb-3" controlId="wd-name">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control type="text" defaultValue="A1 - ENV + HTML" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="wd-description">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} defaultValue="The assignment is available online. Submit a link to the landing page of" />
        </Form.Group>

        <Row className="mb-3">
          <Form.Label column sm={2} htmlFor="wd-points">Points</Form.Label>
          <Col sm={10}>
            <Form.Control type="number" id="wd-points" defaultValue={100} />
          </Col>
        </Row>

        <Row className="mb-3">
          <Form.Label column sm={2} htmlFor="wd-assignment-group">Assignment Group</Form.Label>
          <Col sm={10}>
            <Form.Select id="wd-assignment-group">
              <option value="ASSIGNMENTS">ASSIGNMENTS</option>
            </Form.Select>
          </Col>
        </Row>

        <Row className="mb-3">
          <Form.Label column sm={2} htmlFor="wd-display-grade">Display Grade</Form.Label>
          <Col sm={10}>
            <Form.Select id="wd-display-grade">
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
            <Form.Select id="wd-submission-type">
              <option value="online">Online</option>
              <option value="paper">Paper</option>
              <option value="external_tool">External Tool</option>
            </Form.Select>
          </Col>
        </Row>

        <Row className="mb-3">
          <Form.Label column sm={2}>Online Entry Options</Form.Label>
          <Col sm={10}>
            <Form.Check type="checkbox" id="text-entry" label="Text Entry" />
            <Form.Check type="checkbox" id="website-url" label="Website URL" />
            <Form.Check type="checkbox" id="media-recordings" label="Media Recordings" />
            <Form.Check type="checkbox" id="student-annotation" label="Student Annotation" />
            <Form.Check type="checkbox" id="file-uploads" label="File Uploads" />
          </Col>
        </Row>

        <Row className="mb-3">
          <Form.Label column sm={2} htmlFor="wd-assign-to">Assign To</Form.Label>
          <Col sm={10}>
            <Form.Control type="text" id="wd-assign-to" />
          </Col>
        </Row>

        <Row className="mb-3">
          <Form.Label column sm={2} htmlFor="wd-due-date">Due</Form.Label>
          <Col sm={10}>
            <Form.Control type="date" id="wd-due-date" />
          </Col>
        </Row>

        <Row className="mb-3">
          <Form.Label column sm={2} htmlFor="wd-available-from">Available From</Form.Label>
          <Col sm={10}>
            <Form.Control type="date" id="wd-available-from" />
          </Col>
        </Row>

        <Row className="mb-3">
          <Form.Label column sm={2} htmlFor="wd-available-until">Available Until</Form.Label>
          <Col sm={10}>
            <Form.Control type="date" id="wd-available-until" />
          </Col>
        </Row>

        <div className="d-flex justify-content-end">
          <Button variant="secondary" className="me-2">Cancel</Button>
          <Button variant="primary">Save</Button>
        </div>
      </Form>
    </div>
  );
}