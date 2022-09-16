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
const mongoose_1 = __importDefault(require("mongoose"));
const fitnessPlan_1 = __importDefault(require("../models/fitnessPlan"));
const checkValidObjectID = (id) => {
    return mongoose_1.default.isValidObjectId(id);
};
const CreateFitnessPlan = (userID, date, activities) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fitnessPlan = new fitnessPlan_1.default({
            date,
            owner: userID,
            activities,
        });
        yield fitnessPlan.save();
        return fitnessPlan;
    }
    catch (err) {
        console.error(`FitnessPlanRepo: CreateFitnessPlan: An error occured while creating fitness plan for ${userID} on ${date.toDateString()}`);
        throw new Error('An error occured while creating fitnessPlan');
    }
});
const GetFitnessPlansForUserID = (userID) => __awaiter(void 0, void 0, void 0, function* () {
    const today = new Date();
    if (!checkValidObjectID(userID)) {
        console.error(`FitnessPlanRepo: GetFitnessPlansForUserID: Invalid userID ${userID}`);
        throw new Error('Invalid User ID');
    }
    const fitnessPlans = yield fitnessPlan_1.default.find({ owner: userID, date: { $gte: today } });
    return fitnessPlans;
});
const GetDateFitnessPlanForUser = (userID, date) => __awaiter(void 0, void 0, void 0, function* () {
    const fitnessPlan = yield fitnessPlan_1.default.findOne({ owner: userID, date });
    return fitnessPlan;
});
const GetFitnessPlanByID = (fitnessPlanID) => __awaiter(void 0, void 0, void 0, function* () {
    if (!checkValidObjectID(fitnessPlanID)) {
        console.error(`FitnessPlanRepo: GetFitnessPlanByID: Invalid fitnessPlanID ${fitnessPlanID}`);
        throw new Error('Invalid Fitness Plan ID');
    }
    const fitnessPlan = yield fitnessPlan_1.default.findById(fitnessPlanID);
    return fitnessPlan;
});
const AddActivityToFitnessPlan = (userID, date, exerciseID, quantity, sets, done = false) => __awaiter(void 0, void 0, void 0, function* () {
    if (!checkValidObjectID(exerciseID)) {
        console.error(`ExerciseRepo: AddActivityToFitnessPlan: Invalid exerciseID ${exerciseID}`);
        throw new Error('Invalid Exercise ID');
    }
    const activity = {
        exerciseID,
        totalQuantity: quantity,
        sets,
        done
    };
    try {
        const result = yield fitnessPlan_1.default.findOneAndUpdate({ owner: userID, date }, { $push: { activities: activity } }, { new: true });
        return result;
    }
    catch (err) {
        console.error(err.message);
        console.error(`FitnessPlanRepo: AddActivityToFitnessPlan: Failed to add activity to plan for ${userID} on ${date.toDateString()}`);
        throw new Error('An error occured while adding activity to fitness plan');
    }
});
const DeleteActivityFromFitnessPlan = (userID, date, activityID) => __awaiter(void 0, void 0, void 0, function* () {
    if (!checkValidObjectID(activityID)) {
        console.error(`FitnessPlanRepo: AddActivityToFitnessPlan: Invalid activityID ${activityID}`);
        throw new Error('Invalid Activity ID');
    }
    try {
        const result = yield fitnessPlan_1.default.findOneAndUpdate({ owner: userID, date }, { $pull: { activities: { _id: activityID } } }, { new: true });
        return result;
    }
    catch (err) {
        console.error(err.message);
        console.error(`FitnessPlanRepo: DeleteActivityFromFitnessPlan: Failed to delete activity for ${userID} on ${date.toDateString()}`);
        throw new Error('An error occured while deleting activity from fitness plan');
    }
});
const EditActivityFromFitnessPlan = (userID, date, activityID, exerciseID, quantity, sets, done) => __awaiter(void 0, void 0, void 0, function* () {
    if (!checkValidObjectID(activityID)) {
        console.error(`FitnessPlanRepo: EditActivityFromFitnessPlan: Invalid activityID ${activityID}`);
        throw new Error('Invalid Activity ID');
    }
    if (!checkValidObjectID(exerciseID)) {
        console.error(`FitnessPlanRepo: EditActivityFromFitnessPlan: Invalid exerciseID ${activityID}`);
        throw new Error('Invalid Exercise ID');
    }
    try {
        const fitnessPlan = yield GetDateFitnessPlanForUser(userID, date);
        fitnessPlan.activities.some(item => {
            if (item._id.toString() === activityID) {
                item.exerciseID = exerciseID,
                    item.totalQuantity = quantity,
                    item.sets = sets,
                    item.done = done;
            }
        });
        yield fitnessPlan.save();
        return fitnessPlan;
    }
    catch (err) {
        console.error(err.message);
        console.error(`FitnessPlanRepo: EditActivityFromFitnessPlan: Failed to edit activity for ${userID} on ${date.toDateString()}`);
        throw new Error('An error occured while editing activity from fitness plan');
    }
});
const GetFitnessPlansForDate = (date) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fitnessPlans = yield fitnessPlan_1.default.find({ date });
        return fitnessPlans;
    }
    catch (err) {
        console.error(`FitnessPlanRepo: GetFitnessPlansForDate: ${err.message}`);
        throw new Error('An error occured while fetching fitness plans');
    }
});
const FitnessPlanRepo = {
    CreateFitnessPlan,
    GetFitnessPlansForUserID,
    GetDateFitnessPlanForUser,
    GetFitnessPlanByID,
    AddActivityToFitnessPlan,
    DeleteActivityFromFitnessPlan,
    EditActivityFromFitnessPlan,
    GetFitnessPlansForDate,
};
exports.default = FitnessPlanRepo;
//# sourceMappingURL=fitnessPlanRepo.js.map