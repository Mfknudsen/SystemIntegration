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
const dotenv_1 = __importDefault(require("dotenv"));
const typeorm_1 = require("typeorm");
const taskRepository = __importStar(require("../db_functions/taskRepository"));
const mongodb_1 = require("mongodb");
const ormconfig_1 = require("../ormconfig");
dotenv_1.default.config();
describe('MongoDB Connection Test', () => {
    // Before running the test, initialize the DataSource (connect to the database)
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield ormconfig_1.AppDataSource.initialize();
    }));
    // After all tests, close the connection
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield ormconfig_1.AppDataSource.destroy();
    }));
    it('should connect to MongoDB successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const connection = ormconfig_1.AppDataSource.isInitialized;
        expect(connection).toBe(true); // Check if the connection is initialized
    }));
    it("should fail to connect to MongoDB", () => __awaiter(void 0, void 0, void 0, function* () {
        const WrongDataSource = new typeorm_1.DataSource({
            type: 'mongodb',
            url: 'wrong connection string',
            useNewUrlParser: true,
            useUnifiedTopology: true,
            synchronize: true,
            logging: false,
        });
        yield expect(WrongDataSource.initialize()).rejects.toThrow();
    }));
    it("should fail to connect to MongoDB", () => __awaiter(void 0, void 0, void 0, function* () {
        const WrongDataSource = new typeorm_1.DataSource({
            type: 'mongodb',
            url: 'wrong connection string',
            useNewUrlParser: true,
            useUnifiedTopology: true,
            synchronize: true,
            logging: false,
        });
        yield expect(WrongDataSource.initialize()).rejects.toThrow();
    }));
});
describe("add integration tests", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield ormconfig_1.AppDataSource.initialize();
    }));
    // After all tests, close the connection
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield taskRepository.taskRepository.clear();
        yield ormconfig_1.AppDataSource.destroy();
    }));
    it('should make an api and add task', () => __awaiter(void 0, void 0, void 0, function* () {
        console.log("Test add Task");
        const task = {
            id: new mongodb_1.ObjectId("55dd91c906cded5f17cc8cfe"),
            text: 'Test add Task',
            description: 'description',
            deadline: "NOW",
            isCompleted: false,
            category: 0
        };
        const result = yield taskRepository.createTask(task.text, task.description, task.deadline, task.isCompleted);
        expect(result.text).toEqual(task.text);
        expect(result.deadline).toEqual(task.deadline);
        expect(result.isCompleted).toEqual(task.isCompleted);
    }));
});
