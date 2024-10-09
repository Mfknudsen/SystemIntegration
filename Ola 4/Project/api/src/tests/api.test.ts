import {describe} from "node:test";
import request from "supertest";
import app from "../index";
import {Task} from "../entities/Task";
import {ObjectId} from "mongodb";
import {AppDataSource} from "../ormconfig";
import * as taskRepository from '../db_functions/taskRepository';

describe("API get", () => {
    test("Get", async () => {
        const res = await request(app).get("/tasks");
        expect(res.statusCode).toEqual(200);
    });
});

describe("API post", () => {
    const dummyTask: Task = {
        id: new ObjectId("66dd91c906cded5f17cc8cfe"),
        text: 'Test Task',
        description: 'description',
        deadline: undefined,
        isCompleted: false,
        category: 0
    };

    test("Post", async () => {
        const res = await request(app).post("/tasks").send(dummyTask);
        expect(res.statusCode).toEqual(200);
    });


});

describe("API put", () => {
    const dummyTask: Task = {
        id: new ObjectId("66dd91c906cded5f17cc8cfe"),
        text: 'Test Task',
        description: 'description',
        deadline: undefined,
        isCompleted: false,
        category: 0
    };

    beforeAll(async () => {
        await AppDataSource.initialize();
        await taskRepository.taskRepository.save(dummyTask);
    });

    // After all tests, close the connection
    afterAll(async () => {
        await taskRepository.taskRepository.clear();
        await AppDataSource.destroy();
    });

    test("Put", async () => {
        const res = await request(app).put("/tasks/" + dummyTask.id);
        expect(res.statusCode).toEqual(200);
    });
});
