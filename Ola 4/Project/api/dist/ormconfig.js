"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const Task_1 = require("./entities/Task");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../config.env') });
const isTestEnvironment = process.env.NODE_ENV === 'test';
const databaseName = isTestEnvironment ? 'sqOla1Test' : 'sqOla1';
console.log('Database name:', databaseName);
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'mongodb',
    url: process.env.DATABASE_URL,
    database: databaseName,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    synchronize: true,
    logging: true,
    entities: [Task_1.Task],
});
