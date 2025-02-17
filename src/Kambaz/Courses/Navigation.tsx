
import { Link, useParams, useLocation } from "react-router-dom";
const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];

export default function CourseNavigation() {
  const { cid } = useParams();
  const location = useLocation();

  return (
    <div className="list-group fs-5 rounded-0">
      {links.map((link) => {
        const path = `/Kambaz/Courses/${cid}/${link}`;
        const isActive = location.pathname === path;

        return (
          <Link
            key={link}
            to={path}
            className={`list-group-item text-danger border border-0 list-group-item-action ${isActive ? "active" : ""}`}
          >
            {link}
          </Link>
        );
      })}
    </div>
  );
}