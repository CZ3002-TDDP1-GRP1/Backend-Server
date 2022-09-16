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
exports.default = void 0;
const forecast_1 = __importDefault(require("../models/forecast"));
const GetForecasts = () => __awaiter(void 0, void 0, void 0, function* () {
    const today = new Date();
    today.setHours(0, 0, 0);
    const forecasts = yield forecast_1.default.find({ date: { $gte: today } });
    return forecasts;
});
const GetDateForecast = (date) => __awaiter(void 0, void 0, void 0, function* () {
    const forecast = yield forecast_1.default.findOne({ date });
    return forecast;
});
const CreateForecast = (date, highTemp, lowTemp, forecast, forecastCategory, wetWeather) => __awaiter(void 0, void 0, void 0, function* () {
    const newForecast = new forecast_1.default({
        date,
        highTemp,
        lowTemp,
        forecast,
        forecastCategory,
        wetWeather
    });
    yield newForecast.save();
    return newForecast;
});
const ForecastRepo = {
    GetForecasts,
    GetDateForecast,
    CreateForecast,
};
exports.default = ForecastRepo;
//# sourceMappingURL=forecastRepo.js.map