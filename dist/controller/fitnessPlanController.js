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
const fitnessPlanService_1 = __importDefault(require("../service/fitnessPlanService"));
const GetFitnessPlans = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userID = req.params.user;
    if (!userID) {
        return res.status(401).json({ message: 'User not found' });
    }
    try {
        const fitnessPlans = yield fitnessPlanService_1.default.GetFitnessPlansForUserID(userID);
        return res.json(fitnessPlans);
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
});
const GetDateFitnessPlanForUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userID = req.params.user;
    if (!userID) {
        return res.status(401).json({ message: 'User not found' });
    }
    const { date } = req.params;
    const dateRegex = /^(19|20)\d\d([-])(0[1-9]|1[012])\2(0[1-9]|[12][0-9]|3[01])$/;
    if (!date.match(dateRegex)) {
        console.error(`FitnessPlanController: GetDateFitnessPlanForUser: Invalid date string: ${date}`);
        return res.status(500).json({ message: 'Date must be in yyyy-MM-dd format' });
    }
    const dateObj = new Date(date);
    try {
        const result = yield fitnessPlanService_1.default.GetDateFitnessPlanForUser(userID, dateObj);
        return res.json(result);
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
});
const AddActivityToFitnessPlan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userID = (req.params.user);
    if (!userID) {
        return res.status(401).json({ message: 'User not found' });
    }
    const { exerciseID, quantity, sets } = req.body;
    const { date } = req.params;
    console.log(date, quantity, sets);
    const dateRegex = /^(19|20)\d\d([-])(0[1-9]|1[012])\2(0[1-9]|[12][0-9]|3[01])$/;
    if (!date.match(dateRegex)) {
        console.error(`FitnessPlanController: AddActivityToFitnessPlan: Invalid date string: ${date}`);
        return res.status(500).json({ message: 'Date must be in yyyy-MM-dd format' });
    }
    const dateObj = new Date(date);
    try {
        const result = yield fitnessPlanService_1.default.AddActivityToFitnessPlan(userID, dateObj, exerciseID, quantity, sets);
        return res.json(result);
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
});
const DeleteActivityFromFitnessPlan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userID = req.params.user;
    if (!userID) {
        return res.status(401).json({ message: 'User not found' });
    }
    const { activityID } = req.body;
    const { date } = req.params;
    const dateRegex = /^(19|20)\d\d([-])(0[1-9]|1[012])\2(0[1-9]|[12][0-9]|3[01])$/;
    if (!date.match(dateRegex)) {
        console.error(`FitnessPlanController: DeleteActivityFromFitnessPlan: Invalid date string: ${date}`);
        return res.status(500).json({ message: 'Date must be in yyyy-MM-dd format' });
    }
    const dateObj = new Date(date);
    try {
        const result = yield fitnessPlanService_1.default.DeleteActivityFromFitnessPlan(userID, dateObj, activityID);
        return res.json(result);
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
});
const EditActivityFromFitnessPlan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userID = req.params.user;
    if (!userID) {
        return res.status(401).json({ message: 'User not found' });
    }
    const { activityID, exerciseID, quantity, sets, done } = req.body;
    const { date } = req.params;
    const dateRegex = /^(19|20)\d\d([-])(0[1-9]|1[012])\2(0[1-9]|[12][0-9]|3[01])$/;
    if (!date.match(dateRegex)) {
        console.error(`FitnessPlanController: EditActivityFromFitnessPlan: Invalid date string: ${date}`);
        return res.status(500).json({ message: 'Date must be in yyyy-MM-dd format' });
    }
    const dateObj = new Date(date);
    try {
        const result = yield fitnessPlanService_1.default.EditActivityFromFitnessPlan(userID, dateObj, activityID, exerciseID, quantity, sets, done);
        return res.json(result);
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
});
const FitnessPlanController = {
    GetFitnessPlans,
    GetDateFitnessPlanForUser,
    AddActivityToFitnessPlan,
    DeleteActivityFromFitnessPlan,
    EditActivityFromFitnessPlan,
};
exports.default = FitnessPlanController;
//# sourceMappingURL=fitnessPlanController.js.map