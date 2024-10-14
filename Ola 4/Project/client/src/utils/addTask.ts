// import { addTaskAPI } from '../api/tasks';
// import { Task } from '../types/tasks';

export const addTask = async (newTask: any): Promise<any> => {
    try {
      // return await addTaskAPI(newTask);
    } catch (error) {
      console.error('Error adding task:', error); // eslint-disable-line no-console
      throw error;
    }
  };