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
const node_test_1 = require("node:test");
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const mongodb_1 = require("mongodb");
const ormconfig_1 = require("../ormconfig");
const taskRepository = __importStar(require("../db_functions/taskRepository"));
(0, node_test_1.describe)("API get", () => {
    test("Get", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default).get("/tasks");
        expect(res.statusCode).toEqual(200);
    }));
});
(0, node_test_1.describe)("API post", () => {
    let dummyTask = {
        id: new mongodb_1.ObjectId("66dd91c906cded5f17cc8cfe"),
        text: 'Test Task',
        description: 'description',
        deadline: undefined,
        isCompleted: false,
        category: 0
    };
    test("Post", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default).post("/tasks").send(dummyTask);
        expect(res.statusCode).toEqual(200);
    }));
});
(0, node_test_1.describe)("API put", () => {
    let dummyTask = {
        id: new mongodb_1.ObjectId("66dd91c906cded5f17cc8cfe"),
        text: 'Test Task',
        description: 'description',
        deadline: undefined,
        isCompleted: false,
        category: 0
    };
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield ormconfig_1.AppDataSource.initialize();
        yield taskRepository.taskRepository.save(dummyTask);
    }));
    // After all tests, close the connection
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield taskRepository.taskRepository.clear();
        yield ormconfig_1.AppDataSource.destroy();
    }));
    test("Put", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default).put("/tasks/" + dummyTask.id);
        expect(res.statusCode).toEqual(200);
    }));
});
