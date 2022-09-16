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
const mongoose_1 = __importDefault(require("mongoose"));
let token = "";
let exercises = [];
let distanceBaseExercise = {};
let quantitativeBaseExercise = {};
let createdActivityID = "";
const expiredToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2MTZiYjI1MzEwZTFlN2IxY2M1YzlmYzIiLCJpYXQiOjE2MzQ0NDc5ODksImV4cCI6MTYzNDQ1MTU4OX0.cQQ2d0zCWUcE8PvJoMNXjVSMbLiqSc5k7IlvHOUbB8E";
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoTestDB_1.default.connect();
    yield seed_1.default();
    yield supertest_1.default(app_1.default).post('/auth/register').send({
        email: "qixyqix@Outlook.com",
        name: "Qi Xiang",
        password: "P@ssw0rd"
    }).then((response) => {
        token = response.body.token;
    });
    yield supertest_1.default(app_1.default).get('/exercise').then((response) => {
        exercises = response.body;
        for (const exercise of exercises) {
            if (exercise.quantityType === 'QUANTITATIVE') {
                quantitativeBaseExercise = exercise;
                break;
            }
        }
        for (const exercise of exercises) {
            if (exercise.quantityType === 'DISTANCE') {
                distanceBaseExercise = exercise;
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
describe('FITNESSPLAN: Post activity', () => {
    it('Returns status 401 if no Authorization header is present', () => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest_1.default(app_1.default).post('/plan/2021-11-10/activity').send({
            exerciseID: quantitativeBaseExercise._id,
            quantity: 15,
            sets: 3
        }).expect(401);
    }));
    it('Returns status 401 if expired JWT Token is used', () => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest_1.default(app_1.default).post('/plan/2021-11-10/activity')
            .set('Authorization', expiredToken)
            .send({
            exerciseID: quantitativeBaseExercise._id,
            quantity: 15,
            sets: 3
        }).expect(401);
    }));
    it('Returns status 500 if invalid date format is used', () => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest_1.default(app_1.default).post('/plan/2021-11-1/activity')
            .set('Authorization', token)
            .send({
            exerciseID: quantitativeBaseExercise._id,
            quantity: 15,
            sets: 3
        }).expect(500);
    }));
    it('Returns status 500 if non-existent exercise ID used', () => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest_1.default(app_1.default).post('/plan/2021-11-10/activity')
            .set('Authorization', token)
            .send({
            exerciseID: '6187da4fb5cccfeba574f852',
            quantity: 10,
            sets: 3
        }).expect(500);
    }));
    it('Returns status 500 if quantity < 1', () => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest_1.default(app_1.default).post('/plan/2021-11-10/activity')
            .set('Authorization', token)
            .send({
            exerciseID: quantitativeBaseExercise._id,
            quantity: 0,
            sets: 3
        }).expect(500);
    }));
    it('Returns status 500 is a quantitative exercise and sets < 1', () => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest_1.default(app_1.default).post('/plan/2021-11-10/activity')
            .set('Authorization', token)
            .send({
            exerciseID: quantitativeBaseExercise._id,
            quantity: 15,
            sets: 0
        }).expect(500);
    }));
    it('Returns status 500 if posted schema does not match', () => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest_1.default(app_1.default).post('/plan/2021-11-10/activity')
            .set('Authorization', token)
            .send({
            exerciseID: quantitativeBaseExercise._id,
            quantity: "...",
            sets: 0
        }).expect(500);
    }));
    it('Returns status 200 and the fitness plan when creating a new activity', () => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest_1.default(app_1.default).post('/plan/2021-11-10/activity')
            .set('Authorization', token)
            .send({
            exerciseID: quantitativeBaseExercise._id,
            quantity: 15,
            sets: 1
        }).expect((res) => {
            expect(res.body).toMatchSnapshot({
                _id: expect.any(String),
                activities: expect.any(Array),
                date: expect.any(String),
                owner: expect.any(String)
            });
            for (const activity of res.body.activities) {
                if (activity) {
                    expect(activity).toMatchSnapshot({
                        exerciseID: expect.any(String),
                        totalQuantity: expect.any(Number),
                        sets: expect.any(Number),
                        done: expect.any(Boolean),
                        _id: expect.any(String)
                    });
                }
            }
            createdActivityID = res.body.activities[0]._id;
        }).expect(200);
    }));
    it('Returns status 200 and the fitness plan adding a new activity to an existing fitness plan', () => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest_1.default(app_1.default).post('/plan/2021-11-10/activity')
            .set('Authorization', token)
            .send({
            exerciseID: distanceBaseExercise._id,
            quantity: 15,
            sets: 0
        }).expect((res) => {
            expect(res.body).toMatchSnapshot({
                _id: expect.any(String),
                activities: expect.any(Array),
                date: expect.any(String),
                owner: expect.any(String)
            });
            for (const activity of res.body.activities) {
                if (activity) {
                    expect(activity).toMatchSnapshot({
                        exerciseID: expect.any(String),
                        totalQuantity: expect.any(Number),
                        sets: expect.any(Number),
                        done: expect.any(Boolean),
                        _id: expect.any(String)
                    });
                }
            }
        }).expect(200);
    }));
});
describe('FITNESSPLAN: Get user fitness plans', () => {
    it('Returns status 200 and all of the users fitness plans', () => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest_1.default(app_1.default).get('/plan')
            .set('Authorization', token).expect((res) => {
            for (const fitnessPlan of res.body) {
                if (fitnessPlan) {
                    expect(fitnessPlan).toMatchSnapshot({
                        _id: expect.any(String),
                        activities: expect.any(Array),
                        date: expect.any(String),
                        owner: expect.any(String)
                    });
                    for (const activity of fitnessPlan.activities) {
                        if (activity) {
                            expect(activity).toMatchSnapshot({
                                exerciseID: expect.any(String),
                                totalQuantity: expect.any(Number),
                                sets: expect.any(Number),
                                done: expect.any(Boolean),
                                _id: expect.any(String)
                            });
                        }
                    }
                }
            }
        }).expect(200);
    }));
    it('Returns status 200 and fitness plan of the created date', () => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest_1.default(app_1.default).get('/plan/2021-11-10')
            .set('Authorization', token)
            .expect((res) => {
            expect(res.body).toMatchSnapshot({
                _id: expect.any(String),
                activities: expect.any(Array),
                date: expect.any(String),
                owner: expect.any(String)
            });
            for (const activity of res.body.activities) {
                if (activity) {
                    expect(activity).toMatchSnapshot({
                        exerciseID: expect.any(String),
                        totalQuantity: expect.any(Number),
                        sets: expect.any(Number),
                        done: expect.any(Boolean),
                        _id: expect.any(String)
                    });
                }
            }
        }).expect(200);
    }));
});
describe('FITNESSPLAN: Edit Activity', () => {
    it('Returns status 401 when no Authorization token is provided', () => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest_1.default(app_1.default).patch('/plan/2021-11-10/activity')
            .send({
            activityID: createdActivityID,
            exerciseID: distanceBaseExercise._id,
            quantity: 15,
            sets: 0,
            done: true
        }).expect(401);
    }));
    it('Returns status 401 when no expired Authorization token is provided', () => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest_1.default(app_1.default).patch('/plan/2021-11-10/activity')
            .set('Authorization', expiredToken)
            .send({
            activityID: createdActivityID,
            exerciseID: distanceBaseExercise._id,
            quantity: 15,
            sets: 0,
            done: true
        }).expect(401);
    }));
    it('Returns status 500 when editing fitness plan with invalid date format', () => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest_1.default(app_1.default).patch('/plan/2021-11-1/activity')
            .set('Authorization', token)
            .send({
            activityID: createdActivityID,
            exerciseID: distanceBaseExercise._id,
            quantity: 15,
            sets: 0,
            done: true
        }).expect(500);
    }));
    it('Returns status 500 when invalid activityID is used', () => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest_1.default(app_1.default).patch('/plan/2021-11-10/activity')
            .set('Authorization', token)
            .send({
            activityID: "asdf",
            exerciseID: distanceBaseExercise._id,
            quantity: 15,
            sets: 0,
            done: true
        }).expect(500);
    }));
    it('Returns status 500 when non-existent activityID is used', () => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest_1.default(app_1.default).patch('/plan/2021-11-10/activity')
            .set('Authorization', token)
            .send({
            activityID: new mongoose_1.default.Types.ObjectId().toString(),
            exerciseID: distanceBaseExercise._id,
            quantity: 15,
            sets: 0,
            done: true
        }).expect(500);
    }));
    it('Returns status 500 when quantity < 1', () => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest_1.default(app_1.default).patch('/plan/2021-11-10/activity')
            .set('Authorization', token)
            .send({
            activityID: createdActivityID,
            exerciseID: distanceBaseExercise._id,
            quantity: 0,
            sets: 0,
            done: true
        }).expect(500);
    }));
    it('Returns status 500 when quantitative base exercise and sets < 1', () => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest_1.default(app_1.default).patch('/plan/2021-11-10/activity')
            .set('Authorization', token)
            .send({
            activityID: createdActivityID,
            exerciseID: quantitativeBaseExercise._id,
            quantity: 15,
            sets: 0,
            done: true
        }).expect(500);
    }));
    it('Returns status 500 when done is not included', () => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest_1.default(app_1.default).patch('/plan/2021-11-10/activity')
            .set('Authorization', token)
            .send({
            activityID: createdActivityID,
            exerciseID: quantitativeBaseExercise._id,
            quantity: 15,
            sets: 0
        }).expect(500);
    }));
    it('Returns status 500 when posted schema does not match', () => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest_1.default(app_1.default).patch('/plan/2021-11-10/activity')
            .set('Authorization', token)
            .send({
            activityID: createdActivityID,
            exerciseID: quantitativeBaseExercise._id,
            quantity: "...",
            sets: 0
        }).expect(500);
    }));
    it('Returns status 200 and the fitness plan with the updated activity', () => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest_1.default(app_1.default).patch('/plan/2021-11-10/activity')
            .set('Authorization', token)
            .send({
            activityID: createdActivityID,
            exerciseID: distanceBaseExercise._id,
            quantity: 15,
            sets: 0,
            done: true,
        }).expect((res) => {
            expect(res.body).toMatchSnapshot({
                _id: expect.any(String),
                activities: expect.any(Array),
                date: expect.any(String),
                owner: expect.any(String)
            });
            for (const activity of res.body.activities) {
                if (activity) {
                    expect(activity).toMatchSnapshot({
                        exerciseID: expect.any(String),
                        totalQuantity: expect.any(Number),
                        sets: expect.any(Number),
                        done: expect.any(Boolean),
                        _id: expect.any(String)
                    });
                    if (activity._id === createdActivityID) {
                        expect(activity.done).toBe(true);
                        expect(activity.sets).toBe(0);
                        expect(activity.totalQuantity).toBe(15);
                        expect(activity.exerciseID).toBe(distanceBaseExercise._id);
                    }
                }
            }
        }).expect(200);
    }));
});
describe('FITNESSPLAN: Delete Activity', () => {
    it('Returns status 401 if no Authorization Token is provided', () => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest_1.default(app_1.default).delete('/plan/2021-11-10/activity').send({
            activityID: createdActivityID
        }).expect(401);
    }));
    it('Returns status 401 if expired Authorization Token is provided,', () => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest_1.default(app_1.default).delete('/plan/2021-11-10/activity')
            .set('Authorization', expiredToken)
            .send({
            activityID: createdActivityID
        }).expect(401);
    }));
    it('Returns status 500 if invalid date format is used', () => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest_1.default(app_1.default).delete('/plan/2021-11-1/activity')
            .set('Authorization', token)
            .send({
            activityID: createdActivityID
        }).expect(500);
    }));
    it('Returns status 500 if activity not found', () => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest_1.default(app_1.default).delete('/plan/2021-11-10/activity')
            .set('Authorization', token)
            .send({
            activityID: new mongoose_1.default.Types.ObjectId().toString()
        }).expect(500);
    }));
    it('Returns status 500 if activity not found', () => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest_1.default(app_1.default).delete('/plan/2021-11-10/activity')
            .set('Authorization', token)
            .send({
            activityID: "..."
        }).expect(500);
    }));
    it('Returns status 200 and the fitnessPlan when deleted ', () => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest_1.default(app_1.default).delete('/plan/2021-11-10/activity')
            .set('Authorization', token)
            .send({
            activityID: createdActivityID
        }).expect((res) => {
            expect(res.body).toMatchSnapshot({
                _id: expect.any(String),
                activities: expect.any(Array),
                date: expect.any(String),
                owner: expect.any(String)
            });
            for (const activity of res.body.activities) {
                if (activity) {
                    expect(activity).toMatchSnapshot({
                        exerciseID: expect.any(String),
                        totalQuantity: expect.any(Number),
                        sets: expect.any(Number),
                        done: expect.any(Boolean),
                        _id: expect.any(String)
                    });
                    expect(activity._id).not.toBe(createdActivityID);
                }
            }
        }).expect(200);
    }));
});
//# sourceMappingURL=fitnessPlan.test.js.map