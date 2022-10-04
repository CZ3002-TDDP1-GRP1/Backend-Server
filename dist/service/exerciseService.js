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
const exerciseRepo_1 = __importDefault(require("../repo/exerciseRepo"));
const GetAllExercises = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("GetAllExercises Called");
    try {
        const exercises = yield exerciseRepo_1.default.GetAllExercises();
        return exercises;
    }
    catch (err) {
        console.error(`ExerciseService: GetAllExercises: Unable to get all Exercise data`);
        throw new Error('An error occured while trying to retrieve exercise data');
    }
});
const GetAlternativeForExerciseID = (exerciseID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const exercise = yield exerciseRepo_1.default.GetExerciseByID(exerciseID);
        if (!exercise) {
            console.error(`ExerciseService: GetAlternativeForExerciseID: No exercise by the ID ${exerciseID} found`);
            throw new Error(`Unable to find exercise by ID ${exerciseID}`);
        }
        const exerciseCategory = exercise.category;
        const alternatives = yield exerciseRepo_1.default.GetExerciseByCategory(exerciseCategory, false);
        return alternatives;
    }
    catch (err) {
        console.error(`ExerciseService: GetAlternativeForExerciseID: An error occured while trying to retrieve alternative exercises`);
        throw new Error(`An error occured while trying to find alternatives for exercise`);
    }
});
const GetExerciseByName = (exerciseName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const exercises = yield exerciseRepo_1.default.GetExerciseByName(exerciseName);
        return exercises;
    }
    catch (err) {
        console.error(`ExerciseService: GetExercise: Unable to get exercise data for use ${exerciseName}`);
        throw new Error('An error occured while trying to retrieve exercise data');
    }
});
const ExerciseService = {
    GetAllExercises,
    GetAlternativeForExerciseID,
    GetExerciseByName,
};
exports.default = ExerciseService;
//# sourceMappingURL=exerciseService.js.map