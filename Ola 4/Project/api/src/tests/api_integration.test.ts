import request from 'supertest';
import app from '../index';
import {Task} from "../entities/Task";
import {ObjectId} from "mongodb";
import * as taskRepository from '../db_functions/taskRepository';
import {AppDataSource} from '../ormconfig';


describe('API Integration Tests', () => {

    let dummyTask: Task = {
        id: new ObjectId(),
        text: 'Another dummy task',
        description: 'description',
        deadline: null,
        isCompleted: false,
        category: 0
    };

    beforeAll(async () => {
        await AppDataSource.initialize();
    });

    beforeEach(async () => {
        await taskRepository.taskRepository.clear();
        dummyTask = await taskRepository.createTask('Another dummy task', 'description', null, false);
    });
    afterEach(async () => {
        await taskRepository.taskRepository.clear();
    });
    // After all tests, close the connection
    afterAll(async () => {

        await AppDataSource.destroy();
    });

    it('should return correct data for GET ', async () => {
        const response = await request(app)
            .get('/tasks')
            .expect('Content-Type', /json/)
            .expect(200);
        //console.log("response.body: ", response.body);
        //expect(response.body[0].text).toEqual(dummyTask.text);
        expect(response.body[0].deadline).toEqual(dummyTask.deadline);
        expect(response.body[0].category).toEqual(dummyTask.category);
        expect(response.body.length).toEqual(1);
    });


    it('should return correct data for POST', async () => {
        const post_dummy_task: Task = {
            id:  new ObjectId(),
            text: 'Test add Task',
            description: 'description',
            deadline: "now",
            isCompleted: true,
            category: 1
        };

        const response = await request(app)
            .post('/tasks')
            .send(post_dummy_task)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body.text).toEqual(post_dummy_task.text);
        expect(response.body.deadline).toEqual(post_dummy_task.deadline);
        expect(response.body.isCompleted).toEqual(post_dummy_task.isCompleted);

    });

    it('should return correct data for PUT', async () => {
        const put_dummy_task: Task = {
            id: dummyTask.id,
            text: 'Test put Task',
            description: 'description',
            deadline: "now",
            isCompleted: true,
            category: 1
        };

        const response = await request(app)
            .put(`/tasks/${dummyTask.id}`)
            .send(put_dummy_task)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body.text).toEqual(put_dummy_task.text);
        expect(response.body.deadline).toEqual(put_dummy_task.deadline);
        expect(response.body.isCompleted).toEqual(put_dummy_task.isCompleted);
    });

    it('should return correct data for DELETE', async () => {
        const response = await request(app)
            .delete(`/tasks/`)
            .send({ id: dummyTask.id.toString() })
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body.text).toEqual(dummyTask.text);
        expect(response.body.deadline).toEqual(dummyTask.deadline);
        expect(response.body.isCompleted).toEqual(dummyTask.isCompleted);
        expect(response.body.category).toEqual(dummyTask.category);
    });

    it("should change the completion state of a task", async () => {
        const response = await request(app)
            .patch(`/tasks/`)
            .send({ id: dummyTask, isCompleted: true})
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body.isCompleted).toEqual(true);
    });
});
