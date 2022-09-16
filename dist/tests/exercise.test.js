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
const mongoTestDB_1 = __importDefault(require("./mongoTestDB"));
const app_1 = __importDefault(require("../app"));
const supertest_1 = __importDefault(require("supertest"));
const seed_1 = __importDefault(require("../data/seed"));
let exercises = [];
let createdExerciseID = "";
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoTestDB_1.default.connect();
    yield seed_1.default();
    yield supertest_1.default(app_1.default).get('/exercise').then((response) => {
        exercises = response.body;
        for (const exercise of exercises) {
            if (exercise.name === 'Push Up') {
                createdExerciseID = exercise._id;
                break;
            }
        }
    });
}));
afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
    // await testDB.clearDatabase()
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoTestDB_1.default.clearDatabase();
    yield mongoTestDB_1.default.closeDatabase();
}));
describe('EXERCISE: Get all exercises', () => {
    it('Returns status 200 and all fitness details', () => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest_1.default(app_1.default).get('/exercise').expect((res) => {
            for (const exercise of res.body) {
                if (exercise) {
                    expect(exercise).toMatchSnapshot({
                        _id: expect.any(String),
                        name: expect.any(String),
                        category: expect.any(String),
                        outdoorOnly: expect.any(Boolean),
                        quantityType: expect.any(String),
                        quantityUnit: expect.any(String),
                        calorieBurnRatePerUnit: expect.any(Number)
                    });
                }
            }
        }).expect(200);
    }));
});
describe('EXERCISE: Get alternatives for exercise ID', () => {
    it('Returns status 500 if non-existent exercise ID used', () => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest_1.default(app_1.default).get('/exercise/alt/12345abcde6789fghadc4f86').expect(500);
    }));
    it('Returns null and status 200 if no exercise ID provided', () => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest_1.default(app_1.default).get('/exercise/alt/').expect(null).expect(200);
    }));
    it('Returns status 200 and all fitness details', () => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest_1.default(app_1.default).get('/exercise').expect((res) => {
            for (const exercise of res.body) {
                if (exercise) {
                    expect(exercise).toMatchSnapshot({
                        _id: expect.any(String),
                        name: expect.any(String),
                        category: expect.any(String),
                        outdoorOnly: expect.any(Boolean),
                        quantityType: expect.any(String),
                        quantityUnit: expect.any(String),
                        calorieBurnRatePerUnit: expect.any(Number)
                    });
                }
            }
        }).expect(200);
    }));
});
describe('EXERCISE: Get exercise by name', () => {
    it('Returns null and status 200 if non-existent exercise name used', () => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest_1.default(app_1.default).get('/exercise/Fighting').expect(null).expect(200);
    }));
    it('Returns status 200 and details of exercise of exercise name', () => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest_1.default(app_1.default).get('/exercise/Push Up').expect((res) => {
            expect(res.body).toMatchSnapshot({
                _id: expect.any(String),
                name: expect.any(String),
                category: expect.any(String),
                outdoorOnly: expect.any(Boolean),
                quantityType: expect.any(String),
                quantityUnit: expect.any(String),
                calorieBurnRatePerUnit: expect.any(Number)
            });
        }).expect(200);
    }));
});
//# sourceMappingURL=exercise.test.js.map