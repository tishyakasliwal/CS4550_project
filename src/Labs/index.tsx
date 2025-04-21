import Lab1 from "./Lab1";
import { Route, Routes, Navigate } from "react-router";
import TOC from "./TOC";
import Lab2 from "./Lab2";
import Lab3 from "./Lab3";
import Lab4 from "./Lab4";
import Lab5 from "./Lab5";
import store from "./store";
import { Provider } from "react-redux";

export default function Labs() {
  return (
    <Provider store={store}>
    <div className="container-fluid">
      <h1> Final Project</h1>
      Members: Tishya Kasliwal, Luana Siyoum, Iris Garcia, Ibrahima Toure <br/>
      Github repos used for final project: <a href="https://github.com/tishyakasliwal/CS4550_project"> Web App client</a> &nbsp;
      <a href="https://github.com/tishyakasliwal/kambaz-node-server-app"> Server repo</a>

      <h1>Labs</h1>
      <h3>Tishya Kasliwal CS 4550-02</h3>
      Github repo for kambaz:
        <a href="https://github.com/tishyakasliwal/kambaz-react-web-app" id="wd-github-kambaz"> click here </a><br/>
      <TOC />
      <Routes>
        <Route path="/" element={<Navigate to="Lab1" />} />
        <Route path="Lab1" element={<Lab1 />} />
        <Route path="Lab2/*" element={<Lab2 />} />
        <Route path="Lab3/*" element={<Lab3 />} />
        <Route path="Lab4/*" element={<Lab4 />} />
        <Route path="Lab5/*" element={<Lab5 />} />
      </Routes>
    </div>
    </Provider>
);}

// Components can import other components to aggregate the code snippets
// of the components into larger, more complex HTML content. Here the
// Labs component imports the Lab1 component as the first of a
// set of exercises that will be implemented in later chapters.
// The Lab1 function is invoked with the HTML syntax <Lab1/>
// which is replaced by HTML the function returns implemented in the
// Lab1 function

