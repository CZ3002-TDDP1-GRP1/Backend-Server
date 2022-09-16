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
const app_1 = __importDefault(require("../app"));
const supertest_1 = __importDefault(require("supertest"));
describe('EXERCISE: Get all exercises', () => {
    it('Returns error when database is not connected', () => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest_1.default(app_1.default).get('/exercise/alt/').expect(500);
    }));
    it('Returns error when database is not connected', () => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest_1.default(app_1.default).get('/exercise/Push Up').expect(500);
    }));
});
describe('AUTH: Register an account', () => {
    it('Returns error when database is not connected', () => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest_1.default(app_1.default).post('/auth/register').send({
            email: "qixyqix@Outlook.com",
            name: "Qi Xiang",
            password: "P@ssw0rd"
        }).expect(500);
    }));
});
//# sourceMappingURL=noDB.test.js.map