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
const exerciseService_1 = __importDefault(require("../service/exerciseService"));
const GetAllExercises = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const exercises = yield exerciseService_1.default.GetAllExercises();
        res.json(exercises);
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
});
const GetAlternativeForExerciseID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { exerciseID } = req.params;
        const alternatives = yield exerciseService_1.default.GetAlternativeForExerciseID(exerciseID);
        res.json(alternatives);
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
});
const GetExercise = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const exerciseName = req.params.exerciseName;
    if (!exerciseName) {
        return res.status(401).json({ message: 'Exercise not found' });
    }
    try {
        const exercise = yield exerciseService_1.default.GetExerciseByName(exerciseName);
        res.json(exercise);
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
});
const GetExerciseByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const exerciseID = req.params.exerciseID;
    if (!exerciseID) {
        return res.status(401).json({ message: 'Exercise not found' });
    }
    try {
        const exercise = yield exerciseService_1.default.GetExerciseByID(exerciseID);
        res.json(exercise);
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
});
const ExerciseController = {
    GetAllExercises,
    GetAlternativeForExerciseID,
    GetExercise,
    GetExerciseByID,
};
exports.default = ExerciseController;
//# sourceMappingURL=exerciseController.js.map