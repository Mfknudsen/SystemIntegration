import dotenv from "dotenv";
import * as taskRepository from '../db_functions/taskRepository';
import {Task} from '../entities/Task';
import {ObjectId} from 'mongodb';

jest.mock('../db_functions/taskRepository');


dotenv.config();


describe("Edit Task Test", () => {
    let testTask: Task;
    const dummyTask: Task = {
        id: new ObjectId("66dd91c906cded5f17cc8cfe"),
        text: 'Test Task',
        description: 'description',
        deadline: undefined,
        isCompleted: false,
        category: 0
    };

    beforeEach(async () => {
        // Create a new task
        (taskRepository.createTask as jest.Mock).mockResolvedValue(dummyTask);
        testTask = await taskRepository.createTask('Test Task', 'description', undefined, false);

    });

    it('should edit the task and return the edited task', async () => {
        const updatedTask = {...testTask, text: 'Updated Task'};
        // Mock the update function
        (taskRepository.editTask as jest.Mock).mockResolvedValue(updatedTask);

        if (updatedTask.id === undefined) {
            throw new Error('Task id is undefined');
        }

        const returnedTask = await taskRepository.editTask(updatedTask.id.toString(), updatedTask);
        expect(returnedTask).toEqual(updatedTask);
    });


});
