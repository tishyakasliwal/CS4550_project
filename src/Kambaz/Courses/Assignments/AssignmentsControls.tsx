import { FaPlus, FaSearch } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

export default function AssignmentControls() {
  const { cid } = useParams<{ cid: string }>();

  return (
    <div id="wd-modules-controls" className="text-nowrap">
      <Link to={`/Kambaz/Courses/${cid}/Assignments/new`}> <Button variant="danger" size="lg" className="me-1 float-end" id="wd-add-assignment-btn"> 
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Assignment
      </Button> </Link>
      <Button variant="danger" size="lg" className="me-1 float-end" id="wd-add-group-btn">
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Group
      </Button>
      <input type="text" id="searchbar" placeholder="Search.." />
      <button type="submit"><FaSearch /></button>
    </div>
  );
}