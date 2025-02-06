
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
export default function Signup() {
  return (

    <div id="wd-signup-screen">
    <h1>Sign up</h1>
    <Form.Control id="wd-username"
           placeholder="username"
           className="mb-2"/><br />
    <Form.Control id="wd-password"
           placeholder="password" type="password"
           className="mb-2"/><br />
    <Form.Control id="wd-password-verify"
           placeholder="verify password" type="password"
           className="mb-2"/><br />
    <Link id="wd-signin-btn"
          to="/Kambaz/Account/Profile"
          className="btn btn-primary w-100 mb-2">
          Sign up</Link><br />
    <Link id="wd-signin-link" to="/Kambaz/Account/Signin">Sign up</Link>
  </div> );}



