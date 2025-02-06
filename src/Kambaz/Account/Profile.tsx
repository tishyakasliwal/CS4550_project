import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
export default function Profile() {
  return (
    <div id="wd-profile-screen">
      <h3>Profile</h3>
      <Form.Control defaultValue="alice" placeholder="username" className="wd-username"/><br/>
      <Form.Control defaultValue="123"   placeholder="password" type="password"
             className="wd-password" /><br/>
      <Form.Control defaultValue="Alice" placeholder="First Name" id="wd-firstname" /><br/>
      <Form.Control  defaultValue="Wonderland" placeholder="Last Name" id="wd-lastname" /><br/>
      <Form.Control  defaultValue="2000-01-01" type="date" id="wd-dob" /><br/>
      <Form.Control  defaultValue="alice@wonderland" type="email" id="wd-email" /><br/>
      <Form.Select defaultValue="FACULTY" id="wd-role">
        <option value="USER">User</option>       <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option> <option value="STUDENT">Student</option>
      </Form.Select><br/>
      <Link id="wd-signout-btn" to="/Kambaz/Account/Signin" className="btn btn-primary w-100 mb-2 bg-danger" >Sign out</Link>
    </div>
);}


