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
const forecastRepo_1 = __importDefault(require("../repo/forecastRepo"));
const notifyService_1 = __importDefault(require("../service/notifyService"));
const axios_1 = __importDefault(require("axios"));
const constants_1 = require("../models/constants");
const RetrieveForecastsFromAPI = () => __awaiter(void 0, void 0, void 0, function* () {
    console.info('ForecastRepo: RetrieveForecastsFromAPI: Retrieving forecast from NEA API...');
    let apiData = null;
    let successCall = true;
    try {
        const res = yield axios_1.default.get('https://api.data.gov.sg/v1/environment/4-day-weather-forecast');
        if (res.status !== 200)
            return;
        apiData = res.data;
    }
    catch (err) {
        console.error('ForecastRepo: RetrieveForecastsFromAPI: Error occured whiile retrieving forecast');
        console.error(err.message);
        successCall = false;
    }
    if (!successCall) {
        return;
    }
    const datesToNotify = [];
    const forecastObjs = apiData.items[0].forecasts;
    for (const forecast of forecastObjs) {
        const date = new Date(forecast.date);
        date.setHours(0, 0, 0);
        date.setUTCHours(0, 0, 0);
        const highTemp = forecast.temperature.high;
        const lowTemp = forecast.temperature.low;
        let forecastCategory = constants_1.EForecastCategory.CLEAR;
        const forecastDesc = forecast.forecast;
        if (forecastDesc.toLowerCase().includes('showers'))
            forecastCategory = constants_1.EForecastCategory.SHOWERS;
        if (forecastDesc.toLowerCase().includes('thundery'))
            forecastCategory = constants_1.EForecastCategory.THUNDERY_SHOWERS;
        const wetWeather = (forecastCategory === constants_1.EForecastCategory.CLEAR) ? false : true;
        const existingForecast = yield forecastRepo_1.default.GetDateForecast(date);
        if (!existingForecast) {
            // Create new forecast
            yield forecastRepo_1.default.CreateForecast(date, highTemp, lowTemp, forecastDesc, forecastCategory, wetWeather);
            if (wetWeather)
                datesToNotify.push(date);
        }
        else {
            existingForecast.highTemp = highTemp;
            existingForecast.lowTemp = lowTemp;
            existingForecast.forecast = forecastDesc;
            existingForecast.forecastCategory = forecastCategory;
            if (!existingForecast.wetWeather && wetWeather) {
                datesToNotify.push(date);
            }
            existingForecast.wetWeather = wetWeather;
            yield existingForecast.save();
        }
    }
    console.info(`ForecastRepo: RetrieveForecastsFromAPI: Completed updating forecast information`);
    console.info(`ForecastRepo: RetrieveForecastsFromAPI: Dates to notify are: ${datesToNotify}`);
    if (datesToNotify.length > 0) {
        console.info(`ForecastRepo: RetrieveForecastsFromAPI: Sending Push Notifications...`);
        yield notifyService_1.default.NotifyUsersOfBadWeather(datesToNotify);
    }
});
const ScheduledService = {
    RetrieveForecastsFromAPI,
};
exports.default = ScheduledService;
//# sourceMappingURL=scheduledService.js.map