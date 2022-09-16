"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const constants_1 = require("./constants");
const forecastSchema = new mongoose_1.default.Schema({
    date: { type: Date, unique: true },
    highTemp: Number,
    lowTemp: Number,
    forecast: String,
    forecastCategory: { type: String, enum: Object.values(constants_1.EForecastCategory) },
    wetWeather: Boolean,
});
const Forecast = mongoose_1.default.model('forecast', forecastSchema);
exports.default = Forecast;
//# sourceMappingURL=forecast.js.map