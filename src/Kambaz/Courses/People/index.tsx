import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import * as coursesClient from "../client";
import { FaUserCircle } from "react-icons/fa";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function People() {
  const { cid } = useParams();
  const [users, setUsers] = useState<any[]>([]);
  const { currentUser } = useSelector((state: any) => state.accountReducer); 
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await coursesClient.findUsersForCourse(cid!);
        setUsers(response);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    if (cid) {
      fetchUsers();
    }
  }, [cid]);

  return (
    <div>
      <h2>People Enrolled in Course</h2>
      <Table striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => (
            <tr key={user._id}>
              <td className="wd-full-name text-nowrap">
              
                    <FaUserCircle className="me-2 fs-1 text-secondary" />
                    <span className="wd-first-name">{user.firstName}</span>{" "}
                    <span className="wd-last-name">{user.lastName}</span>
                 
              </td>
              <td className="wd-login-id">{user.loginId}</td>
              <td className="wd-section">{user.section}</td>
              <td className="wd-role">{user.role}</td>
              <td className="wd-last-activity">{user.lastActivity}</td>
              <td className="wd-total-activity">{user.totalActivity}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}