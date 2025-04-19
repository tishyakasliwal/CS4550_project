import { Form, Card, Button, ListGroup } from "react-bootstrap";
import { FaPencilAlt } from "react-icons/fa";
import * as quizzesClient from "./client"; // Import client for fetching questions
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from "uuid";
import { updateQuiz, addQuiz }
  from "./reducer";
import QuizzesControls from "./QuizzesControls";
import QuizzesControlButtons from "./QuizzesControlButtons";


export default function QuizEditor() {
  const { cid, quizId } = useParams();
  const [activeTab, setActiveTab] = useState("details");
  const [questions, setQuestions] = useState<any[]>([]); // Store combined questions
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState<string | null>(null);

  const [quiz, setQuiz] = useState({
    _id: uuidv4(),
    title: "New Quiz",
    course: cid,
    description: "",
    dueDate: "",
    points: 0,
    quesNum: 0,
    score: 0,
    quizType: "Graded Quiz",
    assignmentGroup: "Quizzes",
    shuffleAnswers: "Yes",
    timeLimit: 20,
    multipleAttempts: "No",
    numOfAttemps: 0,
    viewResponses: "After Due Date",
    showCorrectAnswers: "After Submission",
    accessCode: "",
    oneQuestionAtATime: "Yes",
    viewResults: "Yes",
    webcamRequired: "No",
    lockQuestionsAfterAnswering: "No",
    availableDate: "",
    untilDate: "",
    published: false,
  });


  useEffect(() => {
    const fetchQuizDetails = async () => {
      if (quizId && quizId !== "new") {
        try {
          // Fetch quiz details
          const quizData = await quizzesClient.findQuizById(quizId!);
          setQuiz(quizData);

          // Fetch questions by type
          const { mcqQuestions, fillInQuestions, tfQuestions } =
            await quizzesClient.findQuestionsForQuiz(quizId!);

          // Combine all questions into a single array with a `type` field
          const combinedQuestions = [
            ...mcqQuestions.map((q: any) => ({ ...q, type: "MCQ" })),
            ...fillInQuestions.map((q: any) => ({ ...q, type: "FILL_IN_THE_BLANK" })),
            ...tfQuestions.map((q: any) => ({ ...q, type: "TRUE_FALSE" })),
          ];

          setQuestions(combinedQuestions);
        } catch (error) {
          console.error("Error fetching quiz details or questions:", error);
        }
      }
    };
    fetchQuizDetails();
  }, [quizId]);


  const handleSaveQuiz = async (shouldPublish: boolean = false) => {
    try {
      const isNewQuiz = !quizId || quizId === "new";
      const quizToSave = {
        ...quiz,
        course: cid,
        published: shouldPublish
      };

      let savedQuiz;

      if (isNewQuiz) {
        // create new quiz
        savedQuiz = await quizzesClient.createQuiz(quizToSave);
        dispatch(addQuiz(savedQuiz));
      } else {
        // update existing quiz
        await quizzesClient.updateQuiz(quiz._id, quizToSave);
        savedQuiz = quizToSave;
        dispatch(updateQuiz(quizToSave));
      }

      if (shouldPublish) {
        navigate(`/Kambaz/Courses/${cid}/Quizzes`);
      } else {
        navigate(`/Kambaz/Courses/${cid}/Quizzes/${savedQuiz._id}`);
      }
    } catch (err) {
      console.error(`Error ${shouldPublish ? 'publishing' : 'saving'} quiz:`, err);
      setError(`Failed to ${shouldPublish ? 'publish' : 'save'} quiz.`);
    }
  };


  if (error) {
    return <div className="text-danger">{error}</div>;
  }

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const handleEditQuestion = (questionId: string, questionType: string) => {
    navigate(`/Kambaz/Courses/${cid}/Quizzes/${quizId}/edit/questions/${questionType}/${questionId}`);
  };

  const handleAddNewQuestion = () => {
    navigate(`/Kambaz/Courses/${cid}/Quizzes/${quizId}/edit/questions/new`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setQuiz((prevQuiz) => ({
      ...prevQuiz,
      [id]: value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    setQuiz((prevQuiz) => ({
      ...prevQuiz,
      [id]: checked ? "Yes" : "No",
    }));
  };

  const totalPoints = questions.reduce((sum, q) => sum + (q.points || 0), 0);

  useEffect(() => {
    if (questions.length > 0) {
      setQuiz(prevQuiz => ({
        ...prevQuiz,
        points: totalPoints
      }));
    }
  }, [totalPoints]);

  if (!quiz) {
    return <div>Loading...</div>;
  }

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
          <span className="me-2">Points</span>
          <input
            type="number"
            className="form-control"
            id="points"
            value= {quiz.points}
            style={{ width: "60px" }}
            readOnly
            disabled
          />
          {/* <div className="ms-3 d-flex align-items-center">
            <button
              className="btn btn-outline-secondary"
              style={{ border: "none" }}
            >
              <i className="fas fa-ellipsis-v"></i>
            </button>
          </div> */}
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
              id="title"
              value={quiz.title}
              className="w-100"
              onChange={handleChange}
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
                id="description"
                rows={5}
                className="w-100 border-0"
                value={quiz.description}
                onChange={handleChange}
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
                <Form.Label htmlFor="quizType" className="fw-bold">
                  Quiz Type
                </Form.Label>
                <Form.Select
                  id="quizType"
                  className="w-100"
                  value={quiz.quizType}
                  onChange={handleChange}
                >
                  <option value="Graded Quiz">Graded Quiz</option>
                  <option value="Practice Quiz">Practice Quiz</option>
                  <option value="Graded Survey">Graded Survey</option>
                  <option value="Ungraded Survey">Ungraded Survey</option>
                </Form.Select>
              </Form.Group>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-6">
              <Form.Group>
                <Form.Label htmlFor="assignmentGroup" className="fw-bold">
                  Assignment Group
                </Form.Label>
                <Form.Select
                  id="assignmentGroup"
                  className="w-100"
                  value={quiz.assignmentGroup}
                  onChange={handleChange}
                >
                  <option value="Quizzes">Quizzes</option>
                  <option value="Assignments">Assignments</option>
                  <option value="Exams">Exams</option>
                  <option value="Projects">Projects</option>
                </Form.Select>
              </Form.Group>
            </div>
          </div>

          <Card className="mb-4">
            <Card.Body>
              <h5 className="mb-3 fw-bold">Options</h5>
              <Form.Check
                type="checkbox"
                id="wd-shuffle-answers"
                label="Shuffle Answers"
                className="mb-3"
                defaultChecked={quiz.shuffleAnswers === "Yes"}
                onChange={handleCheckboxChange}
              />

              <div className="d-flex align-items-center mb-3">
                <Form.Check
                  type="checkbox"
                  id="time-limit"
                  label="Time Limit"
                  className="me-2"
                  defaultChecked={quiz.timeLimit > 0}
                  // onChange={handleChange}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setQuiz((prevQuiz) => ({
                      ...prevQuiz,
                      timeLimit: checked ? 20 : 0,
                    }));
                  }}
                />
                <Form.Control
                  type="text"
                  id="timeLimit"
                  style={{ width: "60px" }}
                  className="me-2"
                  value={quiz.timeLimit || ""}
                  onChange={handleChange}
                />
                <span>Minutes</span>
              </div>

              <Form.Check
                type="checkbox"
                id="multipleAttempts"
                label="Allow Multiple Attempts"
                className="mb-2"
                checked={quiz.multipleAttempts === "Yes"}
                onChange={handleCheckboxChange}
              />

              <Form.Group className="mb-3">
                <Form.Label htmlFor="showCorrectAnswers" className="mt-2 fw-bold">
                  Show Correct Answers
                </Form.Label>
                <Form.Select
                  id="showCorrectAnswers"
                  className="w-50"
                  value={quiz.showCorrectAnswers}
                  onChange={handleChange}
                >
                  <option value="After Submission">After Submission</option>
                  <option value="After Due Date">After Due Date</option>
                  <option value="After Last Attempt">After Last Attempt</option>
                  <option value="Never">Never</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="accessCode" className="fw-bold">
                  Access Code
                </Form.Label>
                <Form.Control
                  type="text"
                  id="accessCode"
                  placeholder="Blank for no access code"
                  value={quiz.accessCode}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  id="oneQuestionAtATime"
                  label="One Question at a Time"
                  checked={quiz.oneQuestionAtATime === "Yes"}
                  onChange={handleCheckboxChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  id="webcamRequired"
                  label="Webcam Required"
                  checked={quiz.webcamRequired === "Yes"}
                  onChange={handleCheckboxChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  id="lockQuestionsAfterAnswering"
                  label="Lock Questions After Answering"
                  checked={quiz.lockQuestionsAfterAnswering === "Yes"}
                  onChange={handleCheckboxChange}
                />
              </Form.Group>

            </Card.Body>
          </Card>



          <Card className="mb-4">
            <Card.Body>
              <Form.Group className="mb-4">
                <Form.Label htmlFor="wd-assign-to" className="fw-bold">
                  Assign to
                </Form.Label>
                <div className="border rounded p-2 d-flex align-items-center">
                  <span>Everyone</span>
                  <button className="btn btn-m ms-left">×</button>
                </div>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label htmlFor="wd-due-date" className="fw-bold">
                  Due
                </Form.Label>
                <div className="input-group">
                  <Form.Control
                    type="date"
                    id="dueDate"
                    className="w-50"
                    value={quiz.dueDate}
                    onChange={handleChange}
                  />

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
                        type="date"
                        id="availableDate"
                        className="w-50"
                        value={quiz.availableDate}
                        onChange={handleChange}
                      />
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
                        type="date"
                        id="untilDate"
                        className="w-50"
                        value={quiz.untilDate}
                        onChange={handleChange}
                      />
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
            <Button variant="outline-secondary" className="btn-lg" onClick={handleAddNewQuestion}>
              <i className="fas fa-plus me-2"></i> New Question
            </Button>
          </div>
          <ListGroup>
            {questions.map((question) => (
              <ListGroup.Item key={question._id} className="d-flex justify-content-between align-items-center">
                <span>
                  {question.type === "MCQ" && "MCQ: "}
                  {question.type === "FILL_IN_THE_BLANK" && "Fill-in-the-Blank: "}
                  {question.type === "TRUE_FALSE" && "True/False: "}
                  {question.question}
                </span>
                <Button variant="outline-primary" size="sm" onClick={() => handleEditQuestion(question._id, question.type)}>
                  <FaPencilAlt />
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
          {questions.length > 0 && (
            <div className="mt-3 text-end">
              <p>Total Points: {totalPoints}</p>
            </div>
          )}
        </div>
      )}

      <div className="d-flex justify-content-end">
        <Link to={`/Kambaz/Courses/${cid}/Quizzes`}>
          <Button variant="secondary" className="me-2">Cancel</Button>
        </Link>
        <Button variant="primary" className="me-2" onClick={() => handleSaveQuiz(false)}>
          Save
        </Button>
        <Button variant="success" onClick={() => handleSaveQuiz(true)} className="me-2">
          Save & Publish
        </Button>
      </div>
    </div>
  );
}


