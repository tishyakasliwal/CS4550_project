import { FaPlus, FaSearch } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

export default function QuizzesControls() {
  const { cid } = useParams<{ cid: string }>();

  return (
    <div id="wd-modules-controls" className="text-nowrap">
      <Link to={`/Kambaz/Courses/${cid}/Quizzes/new`}> <Button variant="danger" size="lg" className="me-1 float-end" id="wd-add-quizz-btn"> 
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Quizz
      </Button> </Link>
      <input type="text" id="searchbar" placeholder="Search for Quizz" />
      <button type="submit"><FaSearch /></button>
    </div>
  );
}