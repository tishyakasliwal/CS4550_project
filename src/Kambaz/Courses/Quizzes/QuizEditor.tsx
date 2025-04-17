import { Form, Card, Button, ListGroup } from "react-bootstrap";
import { FaPencilAlt } from "react-icons/fa";
import * as quizzesClient from "./client"; // Import client for fetching questions
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from "uuid";
import { updateQuiz, addQuiz }
  from "./reducer";

export default function QuizEditor() {
  const { cid, quizId } = useParams();
  const [activeTab, setActiveTab] = useState("details");
  const [questions, setQuestions] = useState<any[]>([]); // Store combined questions
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState<string | null>(null);

  //const [quiz, setQuiz] = useState<any>(null); // Store quiz details
  
  const [quiz, setQuiz] = useState({
    _id: uuidv4(),
    title: "New Quiz",
    course: cid,
    availability: "Available",
    dueDate: "",
    points: "10",
    quesNum: 0,
    score: "0",
    quizType: "Graded Quiz",
    assignmentGroup: "Quizzes",
    shuffleAnswers: "Yes",
    timeLimit: 20,
    multipleAttempts: "No",
    viewResponses: "No",
    oneQuestionAtATime: "No",
    webcamRequired: "No",
    lockQuestionsAfterAnswering: "No",
    availableDate: "",
    untilDate: "",
    for: "Everyone",
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

    // if (quizId) {
    //   fetchQuizDetails();
    // }
    fetchQuizDetails();
  }, [quizId]);

  

  const handleSave = async () => {
    try {
    if (quizId !== "new") {
      await quizzesClient.updateQuiz(quiz._id, quiz);
      dispatch(updateQuiz(quiz));
    } else {
      //   await quizzesClient.createQuiz(quiz);
      // dispatch(addQuiz({ ...quiz, course: cid }));
      const newQuiz = { ...quiz, course: cid };
      const createdQuiz = await quizzesClient.createQuiz(newQuiz);
      dispatch(addQuiz(createdQuiz));
    }
    navigate(`/Kambaz/Courses/${cid}/Quizzes`);
  } catch (err) {
    console.error("Error saving quiz:", err);
    setError("Failed to save quiz.");
  }
  };

  // const handleSave = async () => {
  //   try {
  //     let savedQuizId;
  //     if (quizId === "new") {
  //       //await quizzesClient.createQuiz(quiz);
  //       const newQuiz = await quizzesClient.createQuiz(quiz);
  //       savedQuizId = newQuiz._id;
  //     } else {
  //       await quizzesClient.updateQuiz(quiz._id, quiz);
  //     }
  //     navigate(`/Kambaz/Courses/${cid}/Quizzes`);
  //   } catch (err) {
  //     console.error("Error saving quiz:", err);
  //     setError("Failed to save quiz.");
  //   }
  // };

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
          <span className="me-2">{quiz.points}</span>
          <input
            type="text"
            className="form-control"
            value={quiz.points}
            style={{ width: "60px" }}
            onChange={handleChange}
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
                  value={quiz.quizType}
                  onChange={handleChange}
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
              <h5 className="mb-3">Options</h5>
              <Form.Check
                type="checkbox"
                id="wd-shuffle-answers"
                label="Shuffle Answers"
                className="mb-3"
                defaultChecked={quiz.shuffleAnswers === "Yes"}
                onChange={handleChange}
              />

              <div className="d-flex align-items-center mb-3">
                <Form.Check
                  type="checkbox"
                  id="wd-time-limit"
                  label="Time Limit"
                  className="me-2"
                  defaultChecked={quiz.timeLimit > 0}
                  onChange={handleChange}
                />
                <Form.Control
                  type="text"
                  style={{ width: "60px" }}
                  className="me-2"
                  value={quiz.timeLimit || ""}
                  onChange={handleChange}
                />
                <span>Minutes</span>
              </div>

              <Form.Check
                type="checkbox"
                id="wd-multiple-attempts"
                label="Allow Multiple Attempts"
                className="mb-2"
                defaultChecked={quiz.multipleAttempts === "Yes"}
                onChange={handleChange}
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
                  <span className="border rounded p-2 d-flex align-items-center">
                    Everyone X
                  </span>
                  {/* <div className="border rounded p-2 d-flex align-items-center">
                    <span>{quiz.for}</span>
                    <button className="btn btn-sm ms-auto">×</button>
                  </div> */}
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
                    value={quiz.dueDate}
                    onChange={handleChange}
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
                        value={quiz.availableDate}
                        onChange={handleChange}
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
                        value={quiz.untilDate}
                        onChange={handleChange}
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
        </div>
      )}

      <div className="d-flex justify-content-end">
        <Link to={`/Kambaz/Courses/${cid}/Quizzes`}>
          <Button variant="secondary" className="me-2">Cancel</Button>
        </Link>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  );
}


