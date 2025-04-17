import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FaTrash } from "react-icons/fa";
import * as quizzesClient from "./client";
import { useDispatch, useSelector } from "react-redux";
import { updateQuiz } from "./reducer";

export default function QuestionEditor() {
  const { cid, quizId, questionId, type } = useParams();
  const dispatch = useDispatch();
  const quizzes = useSelector((state: any) => state.quizzesReducer.quizzes);
  const currentQuiz = quizzes.find((quiz: any) => quiz._id === quizId);
  const navigate = useNavigate();

  // State for the question
  interface Question {
    _id: string;
    quiz: string | undefined;
    title: string;
    points: number;
    question: string;
    choices?: { choice: string; isCorrect: boolean }[];
    correctAnswer?: string;
    correctChoices?: string[];
  }

  const [question, setQuestion] = useState<Question>(
    type === "MCQ"
      ? {
          _id: uuidv4(),
          quiz: quizId,
          title: "",
          points: 0,
          question: "",
          choices: [], // Array of { choice: string, isCorrect: boolean }
        }
      : type === "TRUE_FALSE"
      ? {
          _id: uuidv4(),
          quiz: quizId,
          title: "",
          points: 0,
          question: "",
          correctAnswer: "", // "True" or "False"
        }
      : type === "FILL_IN_THE_BLANK"
      ? {
          _id: uuidv4(),
          quiz: quizId,
          title: "",
          points: 0,
          question: "",
          correctChoices: [], // Array of correct answers
        }
        :{
            _id: uuidv4(),
            quiz: quizId,
            title: "",
            points: 0,
            question: "",
            choices: [], //MCQ by default]
        }
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestion = async () => {
      if (questionId && questionId !== "new") {
        try {
          let fetchedQuestion;
          
          fetchedQuestion = await quizzesClient.findQuestionById(questionId, type || "MCQ");
          
          setQuestion(fetchedQuestion);
        } catch (err) {
          console.error("Error fetching question:", err);
          setError("Failed to load question.");
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [questionId, type]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { id, value } = e.target;
//     setQuestion((prev) => ({ ...prev, [id]: value }));
//   };

  const handleAddChoice = () => {
    if (type === "MCQ") {
      setQuestion((prev) => ({
        ...prev,
        choices: [...(prev.choices || []), { choice: "", isCorrect: false }],
      }));
    } else if (type === "FILL_IN_THE_BLANK") {
      setQuestion((prev) => ({
        ...prev,
        correctChoices: [...(prev.correctChoices || []), ""],
      }));
    }
  };

  const handleChoiceChange = (index: number, value: string) => {
    if (type === "MCQ") {
      setQuestion((prev) => ({
        ...prev,
        choices: (prev.choices || []).map((choice, i) =>
          i === index ? { ...choice, choice: value } : choice
        ),
      }));
    } else if (type === "FILL_IN_THE_BLANK") {
      setQuestion((prev) => ({
        ...prev,
        correctChoices: (prev.correctChoices || []).map((choice, i) =>
          i === index ? value : choice
        ),
      }));
    }
  };

  const handleSetCorrectAnswer = (index: number) => {
    if (type === "MCQ") {
      setQuestion((prev) => ({
        ...prev,
        choices: (prev.choices || []).map((choice, i) => ({
          ...choice,
          isCorrect: i === index,
        })),
      }));
    } else if (type === "TRUE_FALSE") {
      setQuestion((prev) => ({
        ...prev,
        correctAnswer: index === 0 ? "True" : "False",
      }));
    }
  };

  const handleDeleteChoice = (index: number) => {
    if (type === "MCQ") {
      setQuestion((prev) => ({
        ...prev,
        choices: (prev.choices || []).filter((_, i) => i !== index),
      }));
    } else if (type === "FILL_IN_THE_BLANK") {
      setQuestion((prev) => ({
        ...prev,
        correctChoices: (prev.correctChoices || []).filter((_, i) => i !== index),
      }));
    }
  };

  const handleSave = async () => {
    try {
      if (questionId === "new") {
        if (currentQuiz && quizId) {
            //  update the quiz in backend
            await quizzesClient.updateQuiz(quizId, { quesNum: (currentQuiz.quesNum || 0) + 1 });
            // directly update the quiz with the incremented count
            dispatch(updateQuiz({
              ...currentQuiz,
              quesNum: (currentQuiz.quesNum || 0) + 1
            }));
            
          }

        if (type === "MCQ") {
          await quizzesClient.createMCQQuestion(question);
        } else if (type === "TRUE_FALSE") {
          await quizzesClient.createTFQuestion(question);
        } else if (type === "FILL_IN_THE_BLANK") {
          await quizzesClient.createFillInQuestion(question);
        }
      } else {
        if (type === "MCQ") {
          await quizzesClient.updateMCQQuestion(questionId!, question);
        } else if (type === "TRUE_FALSE") {
          await quizzesClient.updateTFQuestion(questionId!, question);
        } else if (type === "FILL_IN_THE_BLANK") {
          await quizzesClient.updateFillInQuestion(questionId!, question);
        }
      }
      navigate(`/Kambaz/Courses/${cid}/Quizzes/${quizId}/edit`);
    } catch (err) {
      console.error("Error saving question:", err);
      setError("Failed to save question.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div id="wd-quizzes-question-editor" className="p-4">
      <h3>{questionId === "new" ? "Add New Question" : "Edit Question"}</h3>
      <Form>
    

        {type === "MCQ" && (
          <div>
            <Form.Label>Choices</Form.Label>
            {(question.choices ?? []).map((choice: any, index: number) => (
              <Row key={index} className="mb-3">
                <Col sm={8}>
                  <Form.Control
                    type="text"
                    value={choice.text}
                    onChange={(e) => handleChoiceChange(index, e.target.value)}
                  />
                </Col>
                <Col sm={2}>
                  <Form.Check
                    type="radio"
                    name="correctAnswer"
                    label="Correct"
                    checked={choice.isCorrect}
                    onChange={() => handleSetCorrectAnswer(index)}
                  />
                </Col>
                <Col sm={2}>
                  <FaTrash
                    className="text-danger"
                    onClick={() => handleDeleteChoice(index)}
                  />
                </Col>
              </Row>
            ))}
            <Button variant="outline-secondary" onClick={handleAddChoice}>
              Add Choice
            </Button>
          </div>
        )}

        {type === "TRUE_FALSE" && (
          <div>
            <Form.Label>Correct Answer</Form.Label>
            <Form.Check
              type="radio"
              name="correctAnswer"
              label="True"
              checked={question.correctAnswer === "True"}
              onChange={() => handleSetCorrectAnswer(0)}
            />
            <Form.Check
              type="radio"
              name="correctAnswer"
              label="False"
              checked={question.correctAnswer === "False"}
              onChange={() => handleSetCorrectAnswer(1)}
            />
          </div>
        )}

        {type === "FILL_IN_THE_BLANK" && (
          <div>
            <Form.Label>Correct Choices</Form.Label>
            {(question.correctChoices ?? []).map((choice: string, index: number) => (
              <Row key={index} className="mb-3">
                <Col sm={10}>
                  <Form.Control
                    type="text"
                    value={choice}
                    onChange={(e) => handleChoiceChange(index, e.target.value)}
                  />
                </Col>
                <Col sm={2}>
                  <FaTrash
                    className="text-danger"
                    onClick={() => handleDeleteChoice(index)}
                  />
                </Col>
              </Row>
            ))}
            <Button variant="outline-secondary" onClick={handleAddChoice}>
              Add Correct Choice
            </Button>
          </div>
        )}

        <div className="d-flex justify-content-between mt-4">
          <Button variant="secondary" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}