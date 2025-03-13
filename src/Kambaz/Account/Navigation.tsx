import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];

  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
      {!currentUser && (
        <>
          <Link to={`/Kambaz/Account/Signin`} className="list-group-item text-danger border border-0"> Signin </Link> <br/>
          <Link to={`/Kambaz/Account/Signup`} className="list-group-item text-danger border border-0"> Signup </Link> <br/>
        </>
      )}
      {currentUser && (
        <Link to={`/Kambaz/Account/Profile`} className="list-group-item text-danger border border-0"> Profile </Link>
      )}
    </div>
  );
}