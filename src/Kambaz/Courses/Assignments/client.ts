import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });

const ASSIGNMENTS_API = `${import.meta.env.VITE_REMOTE_SERVER}/api/assignments`;
const COURSES_API = `${import.meta.env.VITE_REMOTE_SERVER}/api/courses`;

// Fetch all assignments
export const fetchAllAssignments = async () => {
  const response = await axiosWithCredentials.get(ASSIGNMENTS_API);
  return response.data;
};

// Fetch assignments by course ID
export const fetchAssignmentsForCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/assignments`);
  return response.data;
};

// Fetch an assignment by ID
export const fetchAssignmentById = async (assignmentId: string) => {
  const response = await axiosWithCredentials.get(`${ASSIGNMENTS_API}/${assignmentId}`);
  return response.data;
};

// Create a new assignment
export const createAssignment = async (assignment: any) => {
  const response = await axiosWithCredentials.post(ASSIGNMENTS_API, assignment);
  return response.data;
};

// Update an assignment by ID
export const updateAssignment = async (assignmentId: string, assignment: any) => {
  const response = await axiosWithCredentials.put(`${ASSIGNMENTS_API}/${assignmentId}`, assignment);
  return response.data;
};

// Delete an assignment by ID
export const deleteAssignment = async (assignmentId: string) => {
  const response = await axiosWithCredentials.delete(`${ASSIGNMENTS_API}/${assignmentId}`);
  return response.data;
};