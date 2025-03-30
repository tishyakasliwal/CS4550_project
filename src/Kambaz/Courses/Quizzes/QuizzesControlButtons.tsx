import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { Dropdown } from "react-bootstrap";


export default function QuizzesControlButtons({ quiz, onEdit, onDelete, onPublish }: {
  quiz: any;
  onEdit: () => void;
  onDelete: () => void;
  onPublish: () => void;
}) {

  return (
    <div className="d-flex align-items-center float-end">
      <GreenCheckmark />
      <Dropdown>
        <Dropdown.Toggle variant="light" id="quiz-context-menu" className="p-0 border-0 text-dark">
          <IoEllipsisVertical className="fs-4" />
        </Dropdown.Toggle>
        <Dropdown.Menu className="quiz-context-menu">
          <Dropdown.Item onClick={onEdit}>Edit</Dropdown.Item>
          <Dropdown.Item onClick={onDelete}>Delete</Dropdown.Item>
          <Dropdown.Item onClick={onPublish}>
            {quiz.published ? "Unpublish" : "Publish"}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      

      


    </div> );}