import { ListGroup } from "react-bootstrap";
import AssignmentControls from "./AssignmentsControls";
import { BsGripVertical } from "react-icons/bs";
import AssignmentsBannerButtons from "./AssignmentsBannerButtons";
import AssignmentsControlButtons from "./AssignmentsControlButtons";
export default function Assignments() {
    return (
      <div id="wd-assignments">
        <AssignmentControls /><br /><br /><br /><br />

        <ListGroup className="rounded-0" id="wd-modules">
    <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
          
    <div className="wd-title p-3 ps-2 bg-secondary"> <BsGripVertical className="me-2 fs-3" /> Assignments <AssignmentsBannerButtons/>  </div>

    
        
        <ul id="wd-assignment-list">
          <li className="wd-assignment-list-item">
            <a href="#/Kambaz/Courses/1234/Assignments/123"
               className="wd-assignment-link" >
              A1 - ENV + HTML <AssignmentsControlButtons />
            </a> 
            <p> Multiple Modules | <b>Not Available </b> until May 6 at 12:00 am |
            <b> Due</b> May 13 at 11:59 pm | 100 pts </p></li>
          <li className="wd-assignment-list-item">
            <a href="#/Kambaz/Courses/1234/Assignments/124"
               className="wd-assignment-link" >
              A2 - CSS + BOOTSTRAP <AssignmentsControlButtons />
            </a> <p> Multiple Modules | <b>Not Available </b> until May 13 at 12:00 am |
            <b> Due</b> May 20 at 11:59 pm | 100 pts </p>

          </li>
          <li className="wd-assignment-list-item">
            <a href="#/Kambaz/Courses/1234/Assignments/125"
               className="wd-assignment-link" >
              A3 - JAVASCRIPT + REACT <AssignmentsControlButtons />
            </a>
            <p> Multiple Modules | <b>Not Available </b> until May 20 at 12:00 am |
            <b> Due</b> May 27 at 11:59 pm | 100 pts </p>
          </li>
        </ul>
      
     
    </ListGroup.Item>
  </ListGroup>
  </div>
  );}
  