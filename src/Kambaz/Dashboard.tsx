import { Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
        <Col className="wd-dashboard-course" style={{ width: "270px" }}>
            <Card>
    
                <Link to="/Kambaz/Courses/1234/Home"
                    className="wd-dashboard-course-link text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/reactjs.jpg" width="100%" height={160}/>
                <Card.Body>
                <Card.Title className="wd-dashboard-course-title">CS1234 React JS</Card.Title>
                <Card.Text  className="wd-dashboard-course-description">Full Stack software developer</Card.Text>
                <Button variant="primary">Go</Button>
                </Card.Body>
            </Link>
            </Card>
        </Col>

        <Col className="wd-dashboard-course" style={{ width: "270px" }}>
            <Card>
                <Link to="/Kambaz/Courses/1235/Home"
                    className="wd-dashboard-course-link text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/angular.jpg" width="100%" height={160}/>
                <Card.Body>
                <Card.Title className="wd-dashboard-course-title">CS1235 Angular</Card.Title>
                <Card.Text  className="wd-dashboard-course-description">Full Stack software developer</Card.Text>
                <Button variant="primary">Go</Button>
                </Card.Body>
            </Link>
            </Card>
        </Col>    


        <Col className="wd-dashboard-course" style={{ width: "270px" }}>
            <Card>
                <Link to="/Kambaz/Courses/1236/Home"
                    className="wd-dashboard-course-link text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/vuejs.jpg" width="100%" height={160}/>
                <Card.Body>
                <Card.Title className="wd-dashboard-course-title">CS1236 Vue JS</Card.Title>
                <Card.Text  className="wd-dashboard-course-description">Full Stack software developer</Card.Text>
                <Button variant="primary">Go</Button>
                </Card.Body>
            </Link>
            </Card>

        </Col>


        <Col className="wd-dashboard-course" style={{ width: "270px" }}>
            <Card>
                <Link to="/Kambaz/Courses/1237/Home"
                    className="wd-dashboard-course-link text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/nodejs.png" width="100%" height={160}/>
                <Card.Body>
                <Card.Title className="wd-dashboard-course-title">CS1237 Node JS</Card.Title>
                <Card.Text  className="wd-dashboard-course-description">Full Stack software developer</Card.Text>
                <Button variant="primary">Go</Button>
                </Card.Body>
            </Link>
            </Card>
        </Col>

        <Col className="wd-dashboard-course" style={{ width: "270px" }}>
            <Card>
                <Link to="/Kambaz/Courses/1238/Home"
                    className="wd-dashboard-course-link text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/mongodb.png" width="100%" height={160}/>
                <Card.Body>
                <Card.Title className="wd-dashboard-course-title">CS1238 MongoDB</Card.Title>
                <Card.Text  className="wd-dashboard-course-description">Full Stack software developer</Card.Text>
                <Button variant="primary">Go</Button>
                </Card.Body>
            </Link>
            </Card>
        </Col>

        <Col className="wd-dashboard-course" style={{ width: "270px" }}>
            <Card>
                <Link to="/Kambaz/Courses/1239/Home"
                    className="wd-dashboard-course-link text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/expressjs.png" width="100%" height={160}/>
                <Card.Body>
                <Card.Title className="wd-dashboard-course-title">CS1239 Express JS</Card.Title>
                <Card.Text  className="wd-dashboard-course-description">Full Stack software developer</Card.Text>
                <Button variant="primary">Go</Button>
                </Card.Body>
            </Link>
            </Card>
        </Col>

        <Col className="wd-dashboard-course" style={{ width: "270px" }}>
            <Card>
                <Link to="/Kambaz/Courses/1240/Home"
                    className="wd-dashboard-course-link text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/bootstrap.png" width="100%" height={160}/>
                <Card.Body>
                <Card.Title className="wd-dashboard-course-title">CS1240 Bootstrap</Card.Title>
                <Card.Text  className="wd-dashboard-course-description">Full Stack software developer</Card.Text>
                <Button variant="primary">Go</Button>
                </Card.Body>
            </Link>
            </Card>

        </Col>            
        
        </Row>      
      </div>
    </div>
);}
