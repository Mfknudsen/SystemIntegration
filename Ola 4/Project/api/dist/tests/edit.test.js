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
const taskRepository = __importStar(require("../db_functions/taskRepository"));
const mongodb_1 = require("mongodb");
jest.mock('../db_functions/taskRepository');
dotenv_1.default.config();
describe("Edit Task Test", () => {
    let testTask;
    const dummyTask = {
        id: new mongodb_1.ObjectId("66dd91c906cded5f17cc8cfe"),
        text: 'Test Task',
        description: 'description',
        deadline: undefined,
        isCompleted: false,
        category: 0
    };
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        // Create a new task
        taskRepository.createTask.mockResolvedValue(dummyTask);
        testTask = yield taskRepository.createTask('Test Task', 'description', undefined, false);
    }));
    it('should edit the task and return the edited task', () => __awaiter(void 0, void 0, void 0, function* () {
        const updatedTask = Object.assign(Object.assign({}, testTask), { text: 'Updated Task' });
        // Mock the update function
        taskRepository.editTask.mockResolvedValue(updatedTask);
        if (updatedTask.id === undefined) {
            throw new Error('Task id is undefined');
        }
        const returnedTask = yield taskRepository.editTask(updatedTask.id.toString(), updatedTask);
        expect(returnedTask).toEqual(updatedTask);
    }));
});
