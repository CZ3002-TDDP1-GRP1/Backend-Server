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
const exercise_1 = __importDefault(require("../models/exercise"));
const mongoose_1 = __importDefault(require("mongoose"));
const checkValidObjectID = (id) => {
    return mongoose_1.default.isValidObjectId(id);
};
const GetAllExercises = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const exercises = yield exercise_1.default.find();
        return exercises;
    }
    catch (err) {
        console.error(`ExerciseRepo: GetAllExercises: ${err.message}`);
        throw new Error(`An error occured while retrieving all exercises`);
    }
});
const GetExerciseByID = (exerciseID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!checkValidObjectID(exerciseID)) {
            console.error(`ExerciseRepo: GetExerciseByID: Invalid exercise ID: ${exerciseID}`);
            throw new Error(`Invalid exerciseID`);
        }
        const exercise = yield exercise_1.default.findById(exerciseID);
        return exercise;
    }
    catch (err) {
        console.error(`ExerciseRepo: GetExerciseByID: ${err.message}`);
        throw new Error(`An error occured while retrieving exercise by ID`);
    }
});
const GetExerciseByCategory = (exerciseCategory, outdoorOnly) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!outdoorOnly) {
            const exercises = exercise_1.default.find({ category: exerciseCategory, outdoorOnly });
            return exercises;
        }
        else {
            const exercises = exercise_1.default.find({ category: exerciseCategory });
            return exercises;
        }
    }
    catch (err) {
        console.error(`ExerciseRepo: GetExerciseByCategory: ${err.message}`);
        throw new Error(`An error occured while retrieving exercise by category`);
    }
});
const GetExerciseByName = (exerciseName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const exercise = yield exercise_1.default.findOne({ name: exerciseName });
        return exercise;
    }
    catch (err) {
        console.error(`ExerciseRepo: GetExerciseByName: ${err.message}`);
        throw new Error(`An error occured while retrieving exercise by exercise name`);
    }
});
const ExerciseRepo = {
    GetAllExercises,
    GetExerciseByID,
    GetExerciseByCategory,
    GetExerciseByName,
};
exports.default = ExerciseRepo;
//# sourceMappingURL=exerciseRepo.js.map