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
const fitnessPlanRepo_1 = __importDefault(require("../repo/fitnessPlanRepo"));
const userRepo_1 = __importDefault(require("../repo/userRepo"));
const expo_server_sdk_1 = require("expo-server-sdk");
const expo = new expo_server_sdk_1.Expo();
const NotifyUsersOfBadWeather = (datesToNotify) => __awaiter(void 0, void 0, void 0, function* () {
    const expoTokens = [];
    const userIDs = [];
    try {
        for (const currDate of datesToNotify) {
            currDate.setHours(0, 0, 0);
            currDate.setUTCHours(0, 0, 0);
            const fitnessPlans = yield fitnessPlanRepo_1.default.GetFitnessPlansForDate(currDate);
            console.info(fitnessPlans);
            for (const plan of fitnessPlans) {
                if (plan.owner) {
                    console.info(`NotifyService: to notify user ${plan.owner}`);
                    userIDs.push(plan.owner);
                }
            }
        }
        const users = yield userRepo_1.default.GetUsersByMultipleIDs(userIDs);
        for (const user of users) {
            if (user.expoToken && expo_server_sdk_1.Expo.isExpoPushToken(user.expoToken)) {
                console.info(`NotifyService: expoToken ${user.expoToken}`);
                expoTokens.push(user.expoToken);
            }
            else {
                console.info(`NotifyService: NotifyUsersOfBadWeather: ${user._id} has no/invalid expo token`);
            }
        }
        const messageObjs = [];
        expoTokens.forEach((token) => {
            const newMessageObj = {
                to: token,
                sound: 'default',
                body: "Your fitness plan may be affected by Bad Weather!",
            };
            messageObjs.push(newMessageObj);
        });
        const ticketChunks = yield expo.sendPushNotificationsAsync(messageObjs);
        ticketChunks.forEach((chunk) => {
            console.info(`NotifyService: NotifyUsersOfBadWeather: Ticket chunk of message ${chunk}`);
        });
        console.log(expoTokens);
    }
    catch (err) {
        console.error(`NotifyService: NotifyUsersOfBadWeather: ${err.message}`);
    }
});
const NotifyService = {
    NotifyUsersOfBadWeather
};
exports.default = NotifyService;
//# sourceMappingURL=notifyService.js.map