"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskRepository = void 0;
exports.createTask = createTask;
exports.getAllTasks = getAllTasks;
exports.deleteTask = deleteTask;
exports.editTask = editTask;
exports.changeCompleteStateTask = changeCompleteStateTask;
const ormconfig_1 = require("../ormconfig");
const Task_1 = require("../entities/Task");
const mongodb_1 = require("mongodb");
const logicChecks_1 = require("./logicChecks");
const taskRepository = ormconfig_1.AppDataSource.getMongoRepository(Task_1.Task);
exports.taskRepository = taskRepository;
function createTask(text, description, deadline, isCompleted) {
    return __awaiter(this, void 0, void 0, function* () {
        (0, logicChecks_1.checkAddTaskBoundary)(text, deadline, isCompleted);
        const newTask = taskRepository.create({
            text: text,
            description: description,
            deadline: deadline,
            isCompleted: isCompleted,
        });
        const task = yield taskRepository.save(newTask);
        console.log("Task has been saved:", newTask);
        return task;
    });
}
function getAllTasks() {
    return __awaiter(this, void 0, void 0, function* () {
        const tasks = yield taskRepository.find();
        console.log("Found tasks:", tasks);
        return tasks;
    });
}
function editTask(id, _task) {
    return __awaiter(this, void 0, void 0, function* () {
        const objectId = new mongodb_1.ObjectId(id);
        const task = yield taskRepository.findOne({ where: { _id: objectId } });
        if (!task) {
            throw new Error('Task not found');
        }
        else {
            task.text = _task.text;
            task.description = _task.description;
            task.category = _task.category;
            task.deadline = _task.deadline;
            task.isCompleted = _task.isCompleted;
            yield taskRepository.save(task);
            console.log("Task has been updated:", task);
            return task;
        }
    });
}
function deleteTask(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const objectId = new mongodb_1.ObjectId(id);
        const task = yield taskRepository.findOne({ where: { _id: objectId } });
        if (!task) {
            throw new Error("Task not found");
        }
        else {
            yield taskRepository.remove(task);
            console.log("Task has been deleted:", task);
            return task;
        }
    });
}
function changeCompleteStateTask(id, isCompleted) {
    return __awaiter(this, void 0, void 0, function* () {
        const objectId = new mongodb_1.ObjectId(id);
        const task = yield taskRepository.findOne({ where: { _id: objectId } });
        if (!task) {
            throw new Error("Task not found");
        }
        else {
            task.isCompleted = isCompleted;
            yield taskRepository.save(task);
            console.log("Complete state has been updated:", task);
            return task;
        }
    });
}
