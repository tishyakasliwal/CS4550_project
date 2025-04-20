import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Col, Row } from "react-bootstrap";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FaTrash } from "react-icons/fa";
import * as quizzesClient from "./client";

export default function QuestionEditor() {
  const { cid, quizId } = useParams();
  const navigate = useNavigate();

  // State for the question type
  const [type, setType] = useState<"MCQ" | "TRUE_FALSE" | "FILL_IN_THE_BLANK">("MCQ");

    // State for the question
interface Question {
    _id: string;
    quiz: string | undefined;
    title: string;
    points: number;
    question: string;
    choices?: { text: string; isCorrect: boolean }[];
    correctAnswer?: string;
    correctChoices?: string[];
    }

  // State for the question
  const [question, setQuestion] = useState<Question>({
    _id: uuidv4(),
    quiz: quizId,
    title: "",
    points: 0,
    question: "",
    choices: [], // For MCQ
    correctAnswer: "", // For True/False
    correctChoices: [], // For Fill-in-the-Blank
  });

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedType = e.target.value as "MCQ" | "TRUE_FALSE" | "FILL_IN_THE_BLANK";
    setType(selectedType);

    // Reset the question state based on the selected type
    setQuestion({
      _id: uuidv4(),
      quiz: quizId,
      title: "",
      points: 0,
      question: "",
      ...(selectedType === "MCQ" && { choices: [] }),
      ...(selectedType === "TRUE_FALSE" && { correctAnswer: "" }),
      ...(selectedType === "FILL_IN_THE_BLANK" && { correctChoices: [] }),
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setQuestion((prev) => ({ ...prev, [id]: value }));
  };

  const handleAddChoice = () => {
    if (type === "MCQ") {
      setQuestion((prev) => ({
        ...prev,
        choices: [...(prev.choices || []), { text: "", isCorrect: false }],
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
          i === index ? { ...choice, text: value } : choice
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
      if (type === "MCQ") {
        await quizzesClient.createMCQQuestion(question);
      } else if (type === "TRUE_FALSE") {
        await quizzesClient.createTFQuestion(question);
      } else if (type === "FILL_IN_THE_BLANK") {
        await quizzesClient.createFillInQuestion(question);
      }
      navigate(`/Kambaz/Courses/${cid}/Quizzes/${quizId}/edit`);
    } catch (err) {
      console.error("Error saving question:", err);
    }
  };

  return (
    <div id="wd-quizzes-question-editor" className="p-4">
      <h3>Add New Question</h3>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Type</Form.Label>
          <Form.Select value={type} onChange={handleTypeChange}>
            <option value="MCQ">Multiple Choice</option>
            <option value="TRUE_FALSE">True/False</option>
            <option value="FILL_IN_THE_BLANK">Fill in the Blank</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Question</Form.Label>
          <Form.Control
            as="textarea"
            id="question"
            value={question.question}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Points</Form.Label>
          <Form.Control
            type="number"
            id="points"
            value={question.points}
            onChange={handleChange}
          />
        </Form.Group>

        {type === "MCQ" && (
          <div>
            <Form.Label>Choices</Form.Label>
            {(question.choices ?? []).map((choice: any, index: number) => (
              <Row key={index} className="mb-3">
                <Col sm={8}>
                  <Form.Control
                    type="text"
                    value={choice.choice}
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