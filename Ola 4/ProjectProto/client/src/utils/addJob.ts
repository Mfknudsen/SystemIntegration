import { addJobAPI } from "../api/entities";
import { Job } from "../types/types";

export const addJob = async (
  job: Job
): Promise<Job> => {
  try {
    return await addJobAPI(job);
  } catch (error) {
    console.error("Error adding job:", error); // eslint-disable-line no-console
    throw error; 
  }
};
