// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { Button } from "react-bootstrap";
// import { saveQuizAnswers, fetchQuizAnswers } from "./quizActions"; // Actions for saving and fetching answers
export default function QuizPreview() {
}
// export default function QuizPreview() {
//   const { quizId } = useParams<{ quizId: string }>();
//   const dispatch = useDispatch();
//   const quizzes = useSelector((state: any) => state.quizzesReducer.quizzes);
//   const currentUser = useSelector((state: any) => state.accountReducer.currentUser);

//   const quiz = quizzes.find((q: any) => q._id === quizId);
//   const [answers, setAnswers] = useState<{ [key: string]: string }>({});
//   const [score, setScore] = useState<number | null>(null);
//   const [lastAttempt, setLastAttempt] = useState<Date | null>(null);

//   useEffect(() => {
//     // Fetch previous answers for the faculty user
//     if (quizId && currentUser) {
//       dispatch(fetchQuizAnswers(quizId, currentUser._id)).then((data: any) => {
//         if (data) {
//           setAnswers(data.answers || {});
//           setScore(data.score || null);
//           setLastAttempt(data.lastAttempt || null);
//         }
//       });
//     }
//   }, [quizId, currentUser, dispatch]);

//   const handleAnswerChange = (questionId: string, answer: string) => {
//     setAnswers((prev) => ({ ...prev, [questionId]: answer }));
//   };

//   const handleSubmit = () => {
//     if (quiz && currentUser) {
//       // Calculate score
//       let calculatedScore = 0;
//       quiz.questions.forEach((question: any) => {
//         if (answers[question._id] === question.correctAnswer) {
//           calculatedScore += question.points;
//         }
//       });

//       // Save answers and score to the database
//       dispatch(
//         saveQuizAnswers(quizId, currentUser._id, {
//           answers,
//           score: calculatedScore,
//           lastAttempt: new Date(),
//         })
//       );

//       setScore(calculatedScore);
//       setLastAttempt(new Date());
//     }
//   };

//   if (!quiz) {
//     return <div>Quiz not found.</div>;
//   }

//   return (
//     <div className="quiz-preview">
//       <h2>Preview: {quiz.title}</h2>
//       {lastAttempt && (
//         <p>
//           Last Attempt: {new Date(lastAttempt).toLocaleString()} | Score: {score} pts
//         </p>
//       )}
//       <div>
//         {quiz.questions.map((question: any) => (
//           <div key={question._id} className="mb-4">
//             <h5>{question.text}</h5>
//             {question.options.map((option: string) => (
//               <div key={option}>
//                 <label>
//                   <input
//                     type="radio"
//                     name={question._id}
//                     value={option}
//                     checked={answers[question._id] === option}
//                     onChange={() => handleAnswerChange(question._id, option)}
//                   />
//                   {option}
//                 </label>
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>
//       <Button onClick={handleSubmit} variant="primary">
//         Submit
//       </Button>
//     </div>
//   );
// }