import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Form, Card, Button } from "react-bootstrap";
import { quizzes } from "../../Database";

export default function QuizEditor() {
  const { cid, quizId } = useParams();
  const [activeTab, setActiveTab] = useState("details");
  const navigate = useNavigate();
  const quiz = quizzes.find((q) => q._id === quizId && q.course === cid);

  if (!quiz) {
    return <div>Quiz not found</div>;
  }

  const handleTabClick = (tab: any) => {
    setActiveTab(tab);
  };

  const handleQuestionClick = () => {
    navigate(`/Kambaz/Courses/${cid}/Quizzes/${quizId}/edit/questions`);
  };

  return (
    <div
      id="wd-quizzes-editor"
      className="p-4"
      style={{ marginLeft: 0, paddingLeft: 0 }}
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="m-0">{quiz.title}</h3>
        </div>
        <div className="d-flex align-items-center">
          <span className="me-2">{quiz.points}</span>
          <input
            type="text"
            className="form-control"
            defaultValue={quiz.points}
            style={{ width: "60px" }}
          />
          <div className="ms-3 d-flex align-items-center">
            <span className="text-secondary me-2">{quiz.availability}</span>
            <button
              className="btn btn-outline-secondary"
              style={{ border: "none" }}
            >
              <i className="fas fa-ellipsis-v"></i>
            </button>
          </div>
        </div>
      </div>

      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <a
            className={`nav-link ${activeTab === "details" ? "active" : ""}`}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleTabClick("details");
            }}
          >
            Details
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${activeTab === "questions" ? "active" : ""}`}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleTabClick("questions");
            }}
          >
            Questions
          </a>
        </li>
      </ul>

      {activeTab === "details" ? (
        // Details Tab
        <Form>
          <Form.Group className="mb-4">
            <Form.Control
              type="text"
              id="wd-quiz-name"
              defaultValue={quiz.title}
              className="w-100"
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="fw-bold">Quiz Instructions:</Form.Label>
            <div className="border mb-2">
              <div className="bg-light border-bottom px-2 py-1 d-flex">
                <div className="d-flex me-auto">
                  <div className="dropdown me-2">
                    <button
                      className="btn btn-sm dropdown-toggle"
                      type="button"
                    >
                      12pt
                    </button>
                  </div>
                  <div className="dropdown me-2">
                    <button
                      className="btn btn-sm dropdown-toggle"
                      type="button"
                    >
                      Paragraph
                    </button>
                  </div>
                  <div className="btn-group me-2">
                    <button className="btn btn-sm">
                      <strong>B</strong>
                    </button>
                    <button className="btn btn-sm">
                      <i>I</i>
                    </button>
                    <button className="btn btn-sm">
                      <u>U</u>
                    </button>
                  </div>
                  <div className="dropdown me-2">
                    <button
                      className="btn btn-sm dropdown-toggle"
                      type="button"
                    >
                      <i className="fas fa-subscript"></i>
                    </button>
                  </div>
                  <div className="dropdown me-2">
                    <button
                      className="btn btn-sm dropdown-toggle"
                      type="button"
                    >
                      <i className="fas fa-paint-brush"></i>
                    </button>
                  </div>
                  <div className="dropdown me-2">
                    <button
                      className="btn btn-sm dropdown-toggle"
                      type="button"
                    >
                      <i className="fas fa-superscript"></i>
                    </button>
                  </div>
                  <button className="btn btn-sm">
                    <i className="fas fa-ellipsis-h"></i>
                  </button>
                </div>
              </div>
              <Form.Control
                as="textarea"
                id="wd-instructions"
                rows={5}
                className="w-100 border-0"
              />
            </div>
            <div className="d-flex justify-content-between align-items-center text-muted">
              <div>p</div>
              <div className="d-flex align-items-center">
                <span className="text-danger me-2">0 words</span>
                <button className="btn btn-sm" style={{ color: "#999" }}>
                  &lt;/&gt;
                </button>
                <button className="btn btn-sm" style={{ color: "#999" }}>
                  <i className="fas fa-expand"></i>
                </button>
                <button className="btn btn-sm" style={{ color: "#999" }}>
                  <i className="fas fa-ellipsis-v"></i>
                </button>
              </div>
            </div>
          </Form.Group>

          <div className="row mb-4">
            <div className="col-md-6">
              <Form.Group>
                <Form.Label htmlFor="wd-quiz-type" className="fw-bold">
                  Quiz Type
                </Form.Label>
                <Form.Select
                  id="wd-quiz-type"
                  className="w-100"
                  defaultValue={quiz.quizType}
                >
                  <option value="Graded Quiz">Graded Quiz</option>
                  <option value="Practice Quiz">Practice Quiz</option>
                  <option value="Survey">Survey</option>
                </Form.Select>
              </Form.Group>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-6">
              <Form.Group>
                <Form.Label htmlFor="wd-assignment-group" className="fw-bold">
                  Assignment Group
                </Form.Label>
                <Form.Select
                  id="wd-assignment-group"
                  className="w-100"
                  defaultValue={quiz.assignmentGroup}
                >
                  <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                  <option value="Quizzes">Quizzes</option>
                  <option value="Exams">Exams</option>
                </Form.Select>
              </Form.Group>
            </div>
          </div>

          <Card className="mb-4">
            <Card.Body>
              <h5 className="mb-3">Options</h5>
              <Form.Check
                type="checkbox"
                id="wd-shuffle-answers"
                label="Shuffle Answers"
                className="mb-3"
                defaultChecked={quiz.shuffleAnswers === "Yes"}
              />

              <div className="d-flex align-items-center mb-3">
                <Form.Check
                  type="checkbox"
                  id="wd-time-limit"
                  label="Time Limit"
                  className="me-2"
                  defaultChecked={quiz.timeLimit > 0}
                />
                <Form.Control
                  type="text"
                  style={{ width: "60px" }}
                  className="me-2"
                  defaultValue={quiz.timeLimit || ""}
                />
                <span>Minutes</span>
              </div>

              <Form.Check
                type="checkbox"
                id="wd-multiple-attempts"
                label="Allow Multiple Attempts"
                className="mb-2"
                defaultChecked={quiz.multipleAttempts === "Yes"}
              />
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Body>
              <Form.Group className="mb-4">
                <Form.Label htmlFor="wd-assign-to" className="fw-bold">
                  Assign to
                </Form.Label>
                <div className="position-relative">
                  <div className="border rounded p-2 d-flex align-items-center">
                    <span>{quiz.for}</span>
                    <button className="btn btn-sm ms-auto">×</button>
                  </div>
                </div>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label htmlFor="wd-due-date" className="fw-bold">
                  Due
                </Form.Label>
                <div className="input-group">
                  <Form.Control
                    type="text"
                    id="wd-due-date"
                    className="w-100"
                    defaultValue={quiz.dueDate}
                  />
                  <button className="btn btn-outline-secondary">
                    <i className="fas fa-calendar"></i>
                  </button>
                </div>
              </Form.Group>

              <div className="row">
                <div className="col-md-6">
                  <Form.Group>
                    <Form.Label htmlFor="wd-available-from" className="fw-bold">
                      Available from
                    </Form.Label>
                    <div className="input-group">
                      <Form.Control
                        type="text"
                        id="wd-available-from"
                        className="w-100"
                        defaultValue={quiz.availableDate}
                      />
                      <button className="btn btn-outline-secondary">
                        <i className="fas fa-calendar"></i>
                      </button>
                    </div>
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group>
                    <Form.Label
                      htmlFor="wd-available-until"
                      className="fw-bold"
                    >
                      Until
                    </Form.Label>
                    <div className="input-group">
                      <Form.Control
                        type="text"
                        id="wd-available-until"
                        className="w-100"
                        defaultValue={quiz.untilDate}
                      />
                      <button className="btn btn-outline-secondary">
                        <i className="fas fa-calendar"></i>
                      </button>
                    </div>
                  </Form.Group>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Form>
      ) : (
        // Questions Tab
        <div>
          <div className="d-flex justify-content-center my-5">
            <Button
              variant="outline-secondary"
              className="btn-lg"
              onClick={handleQuestionClick}
            >
              <i className="fas fa-plus me-2"></i> New Question
            </Button>
          </div>
          <div className="text-center text-muted">
            Currently {quiz.quesNum} questions • {quiz.points} points total
          </div>
        </div>
      )}

      <div className="d-flex border-top pt-3 mt-4 justify-content-between">
        {activeTab === "details" ? (
          <button className="btn btn-outline-secondary">
            <i className="fas fa-plus"></i> Add
          </button>
        ) : (
          <div></div> // Empty div for spacing purposes
        )}
        <div className="d-flex gap-2">
          <Link to={`/Courses/${cid}/Quizzes`} className="btn btn-secondary">
            Cancel
          </Link>
          <Link to={`/Courses/${cid}/Quizzes`} className="btn btn-danger">
            Save
          </Link>
        </div>
      </div>
    </div>
  );
}
