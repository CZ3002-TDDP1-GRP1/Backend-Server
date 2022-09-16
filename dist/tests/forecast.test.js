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
const mongoTestDB_1 = __importDefault(require("./mongoTestDB"));
const scheduledService_1 = __importDefault(require("../service/scheduledService"));
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoTestDB_1.default.connect();
    yield scheduledService_1.default.RetrieveForecastsFromAPI();
}));
afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
    // await testDB.clearDatabase()
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoTestDB_1.default.clearDatabase();
    yield mongoTestDB_1.default.closeDatabase();
}));
describe("FORECASTS Forecast services", () => {
    it('Returns status 200 and weather forecasts', () => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest_1.default(app_1.default).get("/forecasts/").expect((res) => {
            for (const forecast of res.body) {
                if (forecast) {
                    expect(forecast).toMatchSnapshot({
                        _id: expect.any(String),
                        date: expect.any(String),
                        highTemp: expect.any(Number),
                        lowTemp: expect.any(Number),
                        forecast: expect.any(String),
                        forecastCategory: expect.any(String),
                        wetWeather: expect.any(Boolean)
                    });
                }
            }
        });
    }));
});
//# sourceMappingURL=forecast.test.js.map