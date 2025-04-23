import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import * as client from "./client"; // Import client functions for API calls
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer"; // Redux action to set the current user

export default function Signup() {
  const [credentials, setCredentials] = useState<any>({});
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signup = async () => {
    try {
       console.log("User signed up:", credentials);
      // Call the client function to register the user
      const user = await client.signup(credentials);
      
      if (!user) {
        setError("Signup failed. Please try again.");
        return;
      }

      // Log the user in by setting the current user in Redux
      dispatch(setCurrentUser(user));

      // Navigate to the dashboard or profile page
      navigate("/Kambaz/Dashboard");
    } catch (err) {
      console.error("Error during signup:", err);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div id="wd-signup-screen">
      <h1>Sign up</h1>
      {error && <p className="text-danger">{error}</p>}
      <Form.Control
        id="wd-username"
        placeholder="Username"
        className="mb-2"
        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
      />
      <Form.Control
        id="wd-password"
        placeholder="Password"
        type="password"
        className="mb-2"
        //onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
      />
      <Form.Control
        id="wd-password-verify"
        placeholder="Verify Password"
        type="password"
        className="mb-2"
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
      />
      <Button
        id="wd-signup-btn"
        className="w-100 mb-2"
        onClick={signup}
      >
        Sign up
      </Button>
      <Link id="wd-signin-link" to="/Kambaz/Account/Signin">
        Already have an account? Sign in
      </Link>
    </div>
  );
}



