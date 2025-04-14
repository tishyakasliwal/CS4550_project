import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PeopleTable from "./Table"; // Assuming this is the table component

import * as coursesClient from "../client"; // Assuming this is the client for API calls

export default function People() {
  const { cid } = useParams();
  const [users, setUsers] = useState<any[]>([]);

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
      <PeopleTable users={users} />
    </div>
  );
}