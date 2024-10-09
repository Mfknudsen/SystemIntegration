"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const mongodb_1 = require("mongodb");
const taskRepository = __importStar(require("../db_functions/taskRepository"));
const ormconfig_1 = require("../ormconfig");
describe('API Integration Tests', () => {
    let dummyTask = {
        id: new mongodb_1.ObjectId(),
        text: 'Another dummy task',
        description: 'description',
        deadline: null,
        isCompleted: false,
        category: 0
    };
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield ormconfig_1.AppDataSource.initialize();
    }));
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield taskRepository.taskRepository.clear();
        dummyTask = yield taskRepository.createTask('Another dummy task', 'description', null, false);
        console.log("dummyTask before each: ", dummyTask);
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield taskRepository.taskRepository.clear();
    }));
    // After all tests, close the connection
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield ormconfig_1.AppDataSource.destroy();
    }));
    it('should return correct data for GET ', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.default)
            .get('/tasks')
            .expect('Content-Type', /json/)
            .expect(200);
        console.log("response.body: ", response.body);
        //expect(response.body[0].text).toEqual(dummyTask.text);
        expect(response.body[0].deadline).toEqual(dummyTask.deadline);
        expect(response.body[0].category).toEqual(dummyTask.category);
        expect(response.body.length).toEqual(1);
    }));
    it('should return correct data for POST', () => __awaiter(void 0, void 0, void 0, function* () {
        const post_dummy_task = {
            id: new mongodb_1.ObjectId(),
            text: 'Test add Task',
            description: 'description',
            deadline: "now",
            isCompleted: true,
            category: 1
        };
        const response = yield (0, supertest_1.default)(index_1.default)
            .post('/tasks')
            .send(post_dummy_task)
            .expect('Content-Type', /json/)
            .expect(200);
        expect(response.body.text).toEqual(post_dummy_task.text);
        expect(response.body.deadline).toEqual(post_dummy_task.deadline);
        expect(response.body.isCompleted).toEqual(post_dummy_task.isCompleted);
    }));
    it('should return correct data for PUT', () => __awaiter(void 0, void 0, void 0, function* () {
        const put_dummy_task = {
            id: dummyTask.id,
            text: 'Test put Task',
            description: 'description',
            deadline: "now",
            isCompleted: true,
            category: 1
        };
        const response = yield (0, supertest_1.default)(index_1.default)
            .put(`/tasks/${dummyTask.id}`)
            .send(put_dummy_task)
            .expect('Content-Type', /json/)
            .expect(200);
        expect(response.body.text).toEqual(put_dummy_task.text);
        expect(response.body.deadline).toEqual(put_dummy_task.deadline);
        expect(response.body.isCompleted).toEqual(put_dummy_task.isCompleted);
    }));
    it('should return correct data for DELETE', () => __awaiter(void 0, void 0, void 0, function* () {
        const _id = dummyTask.id.toString();
        console.log("dummyTask id: ", _id);
        const response = yield (0, supertest_1.default)(index_1.default)
            .delete(`/tasks/`)
            .send({ id: dummyTask.id.toString() })
            .expect('Content-Type', /json/)
            .expect(200);
        expect(response.body.text).toEqual(dummyTask.text);
        expect(response.body.deadline).toEqual(dummyTask.deadline);
        expect(response.body.isCompleted).toEqual(dummyTask.isCompleted);
        expect(response.body.category).toEqual(dummyTask.category);
    }));
    it("should change the completion state of a task", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.default)
            .patch(`/tasks/`)
            .send({ id: dummyTask, isCompleted: true })
            .expect('Content-Type', /json/)
            .expect(200);
        expect(response.body.isCompleted).toEqual(true);
    }));
});
