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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
describe('API Integration Tests', () => {
    it('should return a 200 status and the correct data for GET /api/resource', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.default)
            .get('/api/resource')
            .expect('Content-Type', /json/)
            .expect(200);
        expect(response.body).toEqual({
            data: 'expectedData', // Replace with actual expected data
        });
    }));
    it('should create a new resource via POST /api/resource', () => __awaiter(void 0, void 0, void 0, function* () {
        const newResource = { name: 'New Resource', type: 'Type A' };
        const response = yield (0, supertest_1.default)(index_1.default)
            .post('/api/resource')
            .send(newResource)
            .expect('Content-Type', /json/)
            .expect(201);
        expect(response.body).toHaveProperty('id'); // Expecting an ID property in the response
        expect(response.body.name).toBe(newResource.name);
    }));
    // Add more test cases as needed...
});
