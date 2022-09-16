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
const exerciseRepo_1 = __importDefault(require("../repo/exerciseRepo"));
const constants_1 = require("../models/constants");
const GetFitnessPlansForUserID = (userID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fitnessPlans = yield fitnessPlanRepo_1.default.GetFitnessPlansForUserID(userID);
        return fitnessPlans;
    }
    catch (err) {
        console.error(`FitnessPlanService: GetFitnessPlansForUserID: Unable to get fitness plans for use ${userID}`);
        throw new Error('An error occured while trying to retrieve fitness plans');
    }
});
const GetDateFitnessPlanForUser = (userID, date) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fitnessPlans = yield fitnessPlanRepo_1.default.GetDateFitnessPlanForUser(userID, date);
        return fitnessPlans;
    }
    catch (err) {
        console.error(`FitnessPlanService: GetDateFitnessPlanForUser: Unable to get date fitness plans for use ${userID}`);
        throw new Error('An error occured while trying to retrieve fitness plans');
    }
});
const AddActivityToFitnessPlan = (userID, date, exerciseID, quantity, sets) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (quantity == null || quantity < 1 || quantity === undefined) {
            console.error('FitnessPlanService: AddActivityToFitnessPlan: quantity detail is null');
            throw new Error('Invalid Input: Quantity must be more than or equal to 1 ');
        }
        const exercise = yield exerciseRepo_1.default.GetExerciseByID(exerciseID);
        if (!exercise) {
            console.error('FitnessPlanService: AddActivityToFitnessPlan: Invalid exerciseID');
            throw new Error('Invalid Input: Invalid exerciseID');
        }
        if (exercise.quantityType === constants_1.EQuantityType.QUANTITATIVE) {
            if (sets < 1) {
                console.error('FitnessPlanService: AddActivityToFitnessPlan: Exercise is quantitative and has sets < 1');
                throw new Error('Invalid Input: Sets must be 1 or more for quantitative exercise');
            }
        }
        else {
            sets = 0;
        }
        const fitnessPlan = yield fitnessPlanRepo_1.default.GetDateFitnessPlanForUser(userID, date);
        if (!fitnessPlan) {
            // Create fitness plan if it does not exist
            const activities = [
                {
                    exerciseID,
                    totalQuantity: quantity,
                    sets,
                    done: false
                }
            ];
            const newFitnessPlan = yield fitnessPlanRepo_1.default.CreateFitnessPlan(userID, date, activities);
            return newFitnessPlan;
        }
        else {
            if (fitnessPlan.owner.toString() !== userID) {
                console.error(`FitnessPlanService: AddActivityToFitnessPlan: User ${userID} attempted to modify fitness plan belonging to ${fitnessPlan.owner}`);
                throw new Error('You do not own this fitness plan!');
            }
            const result = yield fitnessPlanRepo_1.default.AddActivityToFitnessPlan(userID, date, exerciseID, quantity, sets);
            return result;
        }
    }
    catch (err) {
        console.error(`FitnessPlanService: AddActivityToFitnessPlan: An error occured while adding activity to fitness plan for ${userID} on ${date.toDateString()}`);
        throw new Error(err.message);
    }
});
const DeleteActivityFromFitnessPlan = (userID, date, activityID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!activityID) {
            console.error('FitnessPlanService: AddActivityToFitnessPlan: activityID detail is null');
            throw new Error('An error occured while trying to add activity');
        }
        const fitnessPlan = yield fitnessPlanRepo_1.default.GetDateFitnessPlanForUser(userID, date);
        if (!fitnessPlan) {
            console.error(`FitnessPlanService: DeleteActivityFromFitnessPlan: Fitness Plan for ${userID} on ${date} is already empty`);
            throw new Error('An error occured while trying to delete activity');
        }
        if (fitnessPlan.owner.toString() !== userID) {
            console.error(`FitnessPlanService: DeleteActivityFromFitnessPlan: User ${userID} attempted to modify fitness plan belonging to ${fitnessPlan.owner}`);
            throw new Error('You do not own this fitness plan!');
        }
        if (!(fitnessPlan.activities.find(activity => { return activity._id.toString() === activityID; }))) {
            throw new Error('Activity does not exist');
        }
        const result = yield fitnessPlanRepo_1.default.DeleteActivityFromFitnessPlan(userID, date, activityID);
        return result;
    }
    catch (err) {
        console.error(`FitnessPlanService: DeleteActivityFromFitnessPlan: An error occured while deleting activity to fitness plan for ${userID} on ${date.toDateString()}`);
        throw new Error(err.message);
    }
});
const EditActivityFromFitnessPlan = (userID, date, activityID, exerciseID, quantity, sets, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!activityID) {
            console.error('FitnessPlanService: AddActivityToFitnessPlan: activityID detail is null');
            throw new Error('Invalid Input: No Activity ID');
        }
        else if (!exerciseID) {
            console.error('FitnessPlanService: AddActivityToFitnessPlan: exerciseID detail is null');
            throw new Error('Invalid Input: No Exercise ID');
        }
        else if (quantity == null || quantity < 1 || quantity === undefined) {
            console.error('FitnessPlanService: AddActivityToFitnessPlan: quantity detail is null');
            throw new Error('Invalid Input: Quantity must be more than or equal to 1');
        }
        else if (sets == null || sets === undefined) {
            console.error('FitnessPlanService: AddActivityToFitnessPlan: sets detail is null');
            throw new Error('Invalid Input: Sets is null');
        }
        else if (done == null || done === undefined) {
            console.error('FitnessPlanService: AddActivityToFitnessPlan: done status detail is null');
            throw new Error('Invalid Input: Done is null');
        }
        const exercise = yield exerciseRepo_1.default.GetExerciseByID(exerciseID);
        if (!exercise) {
            throw new Error('Exercise ID not found');
        }
        else if (exercise.quantityType === constants_1.EQuantityType.QUANTITATIVE) {
            if (sets < 1) {
                console.error('FitnessPlanService: EditActivityFromFitnessPlan: Exercise is quantitative and has sets < 1');
                throw new Error('Sets must be > 1 for quantitative based exercise');
            }
        }
        const fitnessPlan = yield fitnessPlanRepo_1.default.GetDateFitnessPlanForUser(userID, date);
        if (!fitnessPlan) {
            console.error(`FitnessPlanService: EditActivityFromFitnessPlan: Fitness Plan for ${userID} on ${date} is empty`);
            throw new Error('No fitnessPlan found for the given date');
        }
        if (fitnessPlan.owner.toString() !== userID) {
            console.error(`FitnessPlanService: EditActivityFromFitnessPlan: User ${userID} attempted to modify fitness plan belonging to ${fitnessPlan.owner}`);
            throw new Error('You do not own this fitness plan!');
        }
        if (!(fitnessPlan.activities.find(activity => { return activity._id.toString() === activityID; }))) {
            throw new Error('Activity does not exist');
        }
        const result = yield fitnessPlanRepo_1.default.EditActivityFromFitnessPlan(userID, date, activityID, exerciseID, quantity, sets, done);
        return result;
    }
    catch (err) {
        console.error(`FitnessPlanService: EditActivityFromFitnessPlan: An error occured while editing activity to fitness plan for ${userID} on ${date.toDateString()}`);
        throw new Error(err.message);
    }
});
const FitnessPlanService = {
    GetFitnessPlansForUserID,
    GetDateFitnessPlanForUser,
    AddActivityToFitnessPlan,
    DeleteActivityFromFitnessPlan,
    EditActivityFromFitnessPlan,
};
exports.default = FitnessPlanService;
//# sourceMappingURL=fitnessPlanService.js.map