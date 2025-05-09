import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import { Navigate, Route, Routes, useParams, useLocation } from "react-router";
import { FaAlignJustify } from "react-icons/fa";
import Quizzes from "./Quizzes";

import QuizDetails from "./Quizzes/QuizDetails";
import QuizDetailsStudent from "./Quizzes/QuizDetailsStudent";
import QuizEditor from "./Quizzes/QuizEditor";
import QuestionEditor from "./Quizzes/QuestionEditor";
import NewQuestionEditor from "./Quizzes/NewQuestionEditor";
import People from "./People";

import QuizPreview from "./Quizzes/QuizPreview";
import QuizPreviewStudent from "./Quizzes/QuizPreviewStudent";


interface CoursesProps {
  courses: any[];
}

export default function Courses({ courses }: CoursesProps) {
  const { cid } = useParams();
  const course = courses.find((course) => course._id === cid);
  const { pathname } = useLocation();

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course && course.name} &gt; {pathname.split("/")[4]}
      </h2>
      <hr />
      <div className="d-flex">
        <div className="d-none d-md-block">
          <CourseNavigation />
        </div>
        <div className="flex-fill">
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Assignments" element={<Assignments />} />
            <Route path="Assignments/:aid" element={<AssignmentEditor />} />

            <Route path="Quizzes/new" element={<QuizEditor />} /> 
            <Route path="Quizzes" element={<Quizzes />} />
            <Route path="Quizzes/:quizId" element={<QuizDetails />} />
            <Route path="Quizzes/:quizId/start" element={<QuizDetailsStudent />} />
            <Route path="Quizzes/:quizId/preview" element={<QuizPreview />} />
            <Route path="Quizzes/:quizId/edit" element={<QuizEditor />} />
            <Route path="Quizzes/:quizId/edit/questions/new" element={<NewQuestionEditor />} />
            <Route path="Quizzes/:quizId/edit/questions/:type/:questionId" element={<QuestionEditor />} />
            <Route path="Quizzes/:quizId/attempt" element={<QuizPreviewStudent />} />
            <Route path="People" element={<People />} />

            
          </Routes>
        </div>
      </div>
    </div>
  );
}
  