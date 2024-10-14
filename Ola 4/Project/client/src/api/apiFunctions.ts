// import { Task } from "../types/tasks";

const baseUrl = "http://localhost:3001";

export const getAllLocationsAPI = async (): Promise<any[]> => {
  const response = await fetch(`${baseUrl}/locations`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw new Error("Failed to get locations");
  }
  return response.json();
};

export const addTaskAPI = async (newTask: any): Promise<any> => {
  const response = await fetch(`${baseUrl}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTask),
  });
  if (!response.ok) {
    throw new Error("Failed to add task");
  }
  return response.json();
};
