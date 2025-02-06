import { ListGroup } from "react-bootstrap";
import ModulesControls from "./ModulesControls";
import { BsGripVertical } from "react-icons/bs";
import LessonControlButtons from "./LessonControlButtons";
import ModulesControlsButtons from "./ModulesControlsButtons";

export default function Modules() {
    return (
      <div>
        {/* Implement Collapse All button, View Progress button, etc. */}
        <ModulesControls /><br /><br /><br /><br />
  <ListGroup className="rounded-0" id="wd-modules">
    <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
          
    <div className="wd-title p-3 ps-2 bg-secondary"> <BsGripVertical className="me-2 fs-3" /> Week 1  <ModulesControlsButtons /> </div>
      <ListGroup className="wd-lessons rounded-0">
        <ListGroup.Item className="wd-lesson p-3 ps-1">
        <BsGripVertical className="me-2 fs-3" /> LEARNING OBJECTIVES <LessonControlButtons />
        </ListGroup.Item>
        <ListGroup.Item className="wd-lesson p-3 ps-1">
        <BsGripVertical className="me-2 fs-3" /> Introduction to the course <LessonControlButtons />
        </ListGroup.Item>
        <ListGroup.Item className="wd-lesson p-3 ps-1">
        <BsGripVertical className="me-2 fs-3" />  Learn what is Web Development <LessonControlButtons />
        </ListGroup.Item>
      </ListGroup>
    </ListGroup.Item>
    <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
      <div className="wd-title p-3 ps-2 bg-secondary"><BsGripVertical className="me-2 fs-3" />  Week 2 <ModulesControlsButtons /> </div>
      <ListGroup className="wd-lessons rounded-0">
        <ListGroup.Item className="wd-lesson p-3 ps-1">
        <BsGripVertical className="me-2 fs-3" /> LESSON 1 <LessonControlButtons /> </ListGroup.Item>
        <ListGroup.Item className="wd-lesson p-3 ps-1">
        <BsGripVertical className="me-2 fs-3" /> LESSON 2 <LessonControlButtons /> </ListGroup.Item>
      </ListGroup>
    </ListGroup.Item>
  </ListGroup>
</div>

  );}
  