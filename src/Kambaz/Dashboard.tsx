import { Link } from "react-router-dom";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/1234/Home"
                className="wd-dashboard-course-link" >
            <img src="/images/reactjs.jpg" width={200} />
            <div>
              <h5> CS1234 React JS </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer  </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course"> 
            <Link to="/Kambaz/Courses/1235/Home"
                    className="wd-dashboard-course-link" >
                <img src="/images/angular.jpg" width={200} />
                <div>
                <h5> CS1235 Angular </h5>
                <p className="wd-dashboard-course-title">
                    Full Stack software developer  </p>
                <button> Go </button>
                </div>
            </Link>
        </div>
        <div className="wd-dashboard-course">
            <Link to="/Kambaz/Courses/1236/Home"
                    className="wd-dashboard-course-link" >
                <img src="/images/vuejs.jpg" width={200} />
                <div>
                <h5> CS1236 Vue JS </h5>
                <p className="wd-dashboard-course-title">
                    Full Stack software developer  </p>
                <button> Go </button>
                </div>
            </Link>
        </div>
        <div className="wd-dashboard-course">
            <Link to="/Kambaz/Courses/1237/Home"
                    className="wd-dashboard-course-link" >
                <img src="/images/nodejs.png" width={200} />
                <div>
                <h5> CS1237 Node JS </h5>
                <p className="wd-dashboard-course-title">
                    Full Stack software developer  </p>
                <button> Go </button>
                </div>
            </Link>
        </div>
        <div className="wd-dashboard-course">
            <Link to="/Kambaz/Courses/1238/Home"
                    className="wd-dashboard-course-link" >
                <img src="/images/mongodb.png" width={200} />
                <div>
                <h5> CS1238 MongoDB </h5>
                <p className="wd-dashboard-course-title">
                    Full Stack software developer  </p>
                <button> Go </button>
                </div>
            </Link>
        </div>
        <div className="wd-dashboard-course">
            <Link to="/Kambaz/Courses/1239/Home"
                    className="wd-dashboard-course-link" >
                <img src="/images/expressjs.png" width={200} />
                <div>
                <h5> CS1239 Express JS </h5>
                <p className="wd-dashboard-course-title">
                    Full Stack software developer  </p>
                <button> Go </button>
                </div>
            </Link>
        </div>
        <div className="wd-dashboard-course">
            <Link to="/Kambaz/Courses/1240/Home"
                    className="wd-dashboard-course-link" >
                <img src="/images/bootstrap.png" width={200} />
                <div>
                <h5> CS1240 Bootstrap </h5>
                <p className="wd-dashboard-course-title">
                    Full Stack software developer  </p>
                <button> Go </button>
                </div>
            </Link>
        </div>        
      </div>
    </div>
);}
