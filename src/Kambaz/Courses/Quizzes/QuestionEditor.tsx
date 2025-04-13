import { Link, useParams } from "react-router-dom";
import { Form, Button, Col, Row } from "react-bootstrap";
import { quizzes } from "../../Database";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface Answer {
    id: string;
    text: string;
    isCorrect: boolean;
}

export default function QuestionEditor() {
    const { cid, quizId } = useParams();
    const quiz = quizzes.find((q) => q._id === quizId && q.course === cid);

    const [answers, setAnswers] = useState<Answer[]>(() => {

        // todo: change to access actual answer
        const savedAnswers = localStorage.getItem(`quiz_${quizId}_answers`);
        if (savedAnswers) {
            return JSON.parse(savedAnswers);
        }

        return [
            { id: uuidv4(), text: "", isCorrect: false },
            { id: uuidv4(), text: "", isCorrect: false },
            { id: uuidv4(), text: "", isCorrect: true }
        ];
    });

    // todo: change to save answers beter
    useEffect(() => {
        localStorage.setItem(`quiz_${quizId}_answers`, JSON.stringify(answers));
    }, [answers, quizId]);

    // add new answer
    const handleAddAnswer = (): void => {
        const newId = uuidv4();
        setAnswers([...answers, { id: newId, text: "", isCorrect: false }]);
    };

    // change answer text
    const handleAnswerTextChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, id: string): void => {
        const newText = event.target.value;
        setAnswers(answers.map(answer =>
            answer.id === id ? { ...answer, text: newText } : answer
        ));
    };

    // set answer as correct
    const handleSetCorrectAnswer = (id: string): void => {
        setAnswers(answers.map(answer =>
            ({ ...answer, isCorrect: answer.id === id })
        ));
    };

    if (!quiz) {
        return <div>Quiz not found</div>;
    }

    return (
        <div
            id="wd-quizzes-quesiton-editor"
            className="p-4"
            style={{ marginLeft: 0, paddingLeft: 0 }}
        >

            <Form>
                <Form.Group className="mb-4">
                    <Form.Control
                        type="text"
                        id="wd-question-name"
                        defaultValue="Easy Question"
                        className="w-100 mb-2"
                    />
                    <Form.Select
                        id="group"
                    //onChange={handleChange}
                    >
                        <option value="multiple-choice">Multiple Choice</option>
                        <option value="true-false">True False</option>
                        <option value="Exams">Fill in</option>
                    </Form.Select>
                    <Form.Label column sm={2} htmlFor="points">
                        Points
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="number"
                            id="points"
                        //value={question.points}
                        //onChange={handleChange}
                        />
                    </Col>
                </Form.Group>

                <Form.Group className="mb-4">
                    <div>Enter your question and multiple answers, then select the one correct answer.</div>
                    <Form.Label className="fw-bold">Question:</Form.Label>
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
                                Answers:
                            </Form.Label>

                            {answers.map((answer) => (
                                <Row className="mb-3" key={answer.id}>
                                    <Form.Label column sm={2} htmlFor={`answer-${answer.id}`}>
                                        {answer.isCorrect ? "Correct Answer" : "Possible Answer"}
                                    </Form.Label>
                                    <Col sm={8}>
                                        <Form.Control
                                            type="text"
                                            id={`answer-${answer.id}`}
                                            value={answer.text}
                                            onChange={(e) => handleAnswerTextChange(e, answer.id)}
                                        />
                                    </Col>
                                    <Col sm={2}>
                                        <Form.Check
                                            type="radio"
                                            name="correctAnswer"
                                            label="Correct"
                                            checked={answer.isCorrect}
                                            onChange={() => handleSetCorrectAnswer(answer.id)}
                                        />
                                    </Col>
                                </Row>
                            ))}


                        </Form.Group>
                    </div>
                </div>
                <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={handleAddAnswer}
                    className="mt-2"
                >
                    <i className="fas fa-plus me-1"></i> Add Another Answer
                </Button>

                <div className="d-flex border-top pt-3 mt-4 justify-content-between">

                    <div className="d-flex gap-2">
                        <Link to={`/Courses/${cid}/Quizzes`} className="btn btn-secondary">
                            Cancel
                        </Link>
                        <Link to={`/Courses/${cid}/Quizzes`} className="btn btn-danger">
                            Save
                        </Link>
                    </div>
                </div>
            </Form>


        </div>
    );
}
