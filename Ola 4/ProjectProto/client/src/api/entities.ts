import { Job, Warehouse } from "../types/types";

const baseUrl = "http://localhost:3001";

export const getAllWarehousesAPI = async (): Promise<Warehouse[]> => {
  const response = await fetch(`${baseUrl}/warehouses`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw new Error("Failed to get warehouses");
  }
  return response.json();
};

export const getAllJobsAPI = async (): Promise<Job[]> => {
  const response = await fetch(`${baseUrl}/jobs`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw new Error("Failed to get jobs");
  }
  return response.json();
};

export const addJobAPI = async (newJob: Job): Promise<Job> => {
  const response = await fetch(`${baseUrl}/jobs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newJob),
  });
  if (!response.ok) {
    throw new Error("Failed to add task");
  }
  return response.json();
};
