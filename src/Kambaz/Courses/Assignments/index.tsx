import { ListGroup } from "react-bootstrap";
import AssignmentControls from "./AssignmentsControls";
import { BsGripVertical } from "react-icons/bs";
import AssignmentsBannerButtons from "./AssignmentsBannerButtons";
import AssignmentsControlButtons from "./AssignmentsControlButtons";
import { LuNotepadText } from "react-icons/lu";
import { useParams } from "react-router-dom";
import { assignments } from "../../Database";
import "../../styles.css";

export default function Assignments() {
  const { cid } = useParams<{ cid: string }>();
  const courseAssignments = assignments.filter((assignment) => assignment.course === cid);

  return (
    <div id="wd-assignments">
      <AssignmentControls /><br /><br /><br /><br />

      <ListGroup className="rounded-0" id="wd-modules">
        <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" /> Assignments <AssignmentsBannerButtons />
          </div>

          <ListGroup id="wd-assignment-list" className="wd-lessons rounded-0">
            {courseAssignments.map((assignment) => (
              <ListGroup.Item key={assignment._id} className="wd-assignment-list-item">
                <a href={`#/Kambaz/Courses/${cid}/Assignments/${assignment._id}`} className="wd-assignment-link">
                  <BsGripVertical className="me-2 fs-3" /> <LuNotepadText className="me-2 fs-3" />
                  {assignment.title} <AssignmentsControlButtons />
                </a>
                <p> <b> Not Available </b> until {assignment.availableDate} | <b> Due </b> {assignment.dueDate} | {assignment.points} points</p>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}
  