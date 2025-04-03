import Nav from "react-bootstrap/Nav";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
export default function TOC() {
  const { pathname } = useLocation();
  return (
    <Nav variant="pills" id="wd-toc">
      <Nav.Item> <Nav.Link as={Link} to="/Labs/Lab1" id="wd-a1"
          active={pathname.includes("Lab1")}> Lab 1 </Nav.Link> </Nav.Item>
      <Nav.Item> <Nav.Link as={Link} to="/Labs/Lab2" id="wd-a2"
          active={pathname.includes("Lab2")}> Lab 2 </Nav.Link> </Nav.Item>
      <Nav.Item> <Nav.Link as={Link} to="/Labs/Lab3" id="wd-a3"
          active={pathname.includes("Lab3")}> Lab 3 </Nav.Link> </Nav.Item>
      <Nav.Item> <Nav.Link as={Link} to="/Labs/Lab4" id="wd-a4"
          active={pathname.includes("Lab4")}> Lab 4 </Nav.Link> </Nav.Item> 
      <Nav.Item> <Nav.Link as={Link} to="/Labs/Lab5" id="wd-a5"
          active={pathname.includes("Lab5")}> Lab 5 </Nav.Link> </Nav.Item>       
      <Nav.Item> <Nav.Link as={Link} to="/Kambaz" id="wd-a3"> Kambaz </Nav.Link> </Nav.Item>
      <Nav.Item> <Nav.Link href="https://github.com/tishyakasliwal" target="_blank"> My GitHub </Nav.Link> </Nav.Item>
      <Nav.Item> <Nav.Link href="https://github.com/tishyakasliwal/kambaz-node-server-app" target="_blank"> Link to Node Server Repo</Nav.Link></Nav.Item>
      <Nav.Item> <Nav.Link href="https://kambaz-node-server-app1-170d7953e436.herokuapp.com/" target="_blank"> Link to Server on Heroku</Nav.Link></Nav.Item>
      <Nav.Item> <Nav.Link href="https://kambaz-node-server-app-jcvg.onrender.com" target="_blank"> Link to Server on Render</Nav.Link></Nav.Item>
    </Nav>
  );
}

