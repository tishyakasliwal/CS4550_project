import { FaPlus } from "react-icons/fa6";

import { FaSearch } from "react-icons/fa";
import { Button} from "react-bootstrap";
export default function AssignmentControls() {
 return (
   <div id="wd-modules-controls" className="text-nowrap">
     <Button variant="danger" size="lg" className="me-1 float-end" id="wd-add-module-btn">
       <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
       Assignment
     </Button>
     <Button variant="danger" size="lg" className="me-1 float-end" id="wd-add-module-btn">
       <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
       Group
     </Button>
     
        <input type="text" id="searchbar" placeholder="Search.." />
        <button type="submit"><FaSearch /></button>

   </div>
);}