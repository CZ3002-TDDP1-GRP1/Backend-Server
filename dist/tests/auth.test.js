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
const invalidRefresh = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2MTg3YTM0Nzg1MTAzNzQ4Mzg1ZTJjMDYiLCJnZW5lcmF0ZWRBdCI6MTYzNjM0OTA1OTUwNywiaWF0IjoxNjM2MzQ5MDU5LCJleHAiOjE2MzYzNTI2NTl9.V82IKKmp9JilNIs8bCA5EEg0rNhj28v6rCUdbmQ4na8";
let refreshToken = "";
let token = "";
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoTestDB_1.default.connect();
}));
afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
    // await testDB.clearDatabase()
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoTestDB_1.default.clearDatabase();
    yield mongoTestDB_1.default.closeDatabase();
}));
describe('AUTH: Register an account', () => {
    it('Returns status code 500 when an invalid email is used', () => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest_1.default(app_1.default).post('/auth/register').send({
            email: "qixyqixOutlook.com",
            name: "Qi Xiang",
            password: "P@ssw0rd"
        }).expect(500);
    }));
    it('Returns status code 500 when password length shorter than 6 is used', () => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest_1.default(app_1.default).post('/auth/register').send({
            email: "qixyqix@Outlook.com",
            name: "Qi Xiang",
            password: "abc45"
        }).expect(500);
    }));
    it('Returns status code 200 when a valid email and password is provided', () => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest_1.default(app_1.default).post('/auth/register').send({
            email: "qixyqix@Outlook.com",
            name: "Qi Xiang",
            password: "P@ssw0rd"
        }).expect((res) => {
            expect(res.body).toHaveProperty("token");
            expect(res.body).toHaveProperty("refreshToken");
            expect(res.body.token).not.toEqual(undefined);
            expect(res.body.refreshToken).not.toEqual(undefined);
            expect(res.body.token).not.toEqual("");
            expect(res.body.refreshToken).not.toEqual("");
        })
            .expect(200);
    }));
    it('Returns status code 500 when creating a new account using existing email', () => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest_1.default(app_1.default).post('/auth/register').send({
            email: "qixyqix@Outlook.com",
            name: "Qi Xiang",
            password: "P@ssw0rd"
        })
            .expect(500);
    }));
});
describe('AUTH: Login an account', () => {
    it('Returns status code 500 when logging in with invalid email format', () => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest_1.default(app_1.default).post('/auth/login').send({
            email: "qixyqixoutlook.com",
            password: "P@ssw0rd"
        }).expect(500);
    }));
    it('Returns status code 500 when logging in with invalid password length', () => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest_1.default(app_1.default).post('/auth/login').send({
            email: "qixyqixoutlook.com",
            password: "abc45"
        }).expect(500);
    }));
    it('Returns status code 200 with property success = false when logging in', () => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest_1.default(app_1.default).post('/auth/login').send({
            email: "qixyqix@Outlook.com",
            name: "Qi Xiang",
            password: "Pussw0rd"
        }).expect((res) => {
            expect(res.body).toHaveProperty("token");
            expect(res.body).toHaveProperty("refreshToken");
            expect(res.body).toHaveProperty("success");
            expect(res.body).toHaveProperty("message");
            expect(res.body.token).toEqual("");
            expect(res.body.refreshToken).toEqual("");
            expect(res.body.message).not.toEqual(undefined);
            expect(res.body.success).toEqual(false);
        })
            .expect(200);
    }));
    it('Returns status code 200 with property success = true when successful logging in', () => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest_1.default(app_1.default).post('/auth/login').send({
            email: "qixyqix@Outlook.com",
            name: "Qi Xiang",
            password: "P@ssw0rd"
        }).expect((res) => {
            expect(res.body).toHaveProperty("token");
            expect(res.body).toHaveProperty("refreshToken");
            expect(res.body).toHaveProperty("success");
            expect(res.body).toHaveProperty("message");
            expect(res.body.token).not.toEqual("");
            expect(res.body.refreshToken).not.toEqual("");
            expect(res.body.token).not.toEqual(undefined);
            expect(res.body.refreshToken).not.toEqual(undefined);
            expect(res.body.message).not.toEqual(undefined);
            expect(res.body.success).toEqual(true);
            token = res.body.token;
            refreshToken = res.body.refreshToken;
        })
            .expect(200);
    }));
});
describe('AUTH: Refresh token', () => {
    it('Returns status code 401 when no refresh token is provided', () => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest_1.default(app_1.default).post('/auth/refresh').expect(401);
    }));
    it('Returns status code 401 when invalid refresh token is provided', () => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest_1.default(app_1.default).post('/auth/refresh')
            .set('Authorization', invalidRefresh)
            .expect(401);
    }));
    it('Returns status code 200 with new general token when refresh called with valiud refreshToken', () => __awaiter(void 0, void 0, void 0, function* () {
        console.log(`TOKEN: ${refreshToken}`);
        yield supertest_1.default(app_1.default).post('/auth/refresh')
            .set('Authorization', refreshToken)
            .expect((res) => {
            expect(res.body).toHaveProperty('token');
            expect(res.body.token).not.toEqual(undefined);
            expect(res.body.token).not.toEqual('');
        })
            .expect(200);
    }));
});
describe('AUTH: ExpoToken', () => {
    it('Returns status code 401 when no Authorization token is provided', () => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest_1.default(app_1.default).post('/auth/expotoken')
            .send({ expoToken: "expoToken" })
            .expect(401);
    }));
    it('Returns status code 200 when expoToken is set', () => __awaiter(void 0, void 0, void 0, function* () {
        console.log(`TOKEN: ${token}`);
        yield supertest_1.default(app_1.default).post('/auth/expotoken')
            .set('Authorization', token)
            .send({ expoToken: "expoToken" })
            .expect(200);
    }));
});
describe('AUTH: Logout', () => {
    it('Returns status code 401 when no Authorization token is provided', () => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest_1.default(app_1.default).post('/auth/logout')
            .expect(401);
    }));
    it('Returns status code 200 when logged out', () => __awaiter(void 0, void 0, void 0, function* () {
        console.log(`TOKEN: ${token}`);
        yield supertest_1.default(app_1.default).post('/auth/logout')
            .set('Authorization', token)
            .expect(200);
    }));
});
//# sourceMappingURL=auth.test.js.map