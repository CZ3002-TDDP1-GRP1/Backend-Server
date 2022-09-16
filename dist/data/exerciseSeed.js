"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const constants_1 = require("../models/constants");
const ExerciseSeed = [{
        _id: new mongoose_1.default.Types.ObjectId(),
        name: 'Push Up',
        category: constants_1.EExerciseCategory.ANAEROBIC,
        outdoorOnly: false,
        quantityType: constants_1.EQuantityType.QUANTITATIVE,
        quantityUnit: 'reps',
        calorieBurnRatePerUnit: 1.14
    },
    {
        _id: new mongoose_1.default.Types.ObjectId(),
        name: 'Sit Up',
        category: constants_1.EExerciseCategory.ANAEROBIC,
        outdoorOnly: false,
        quantityType: constants_1.EQuantityType.QUANTITATIVE,
        quantityUnit: 'reps',
        calorieBurnRatePerUnit: 1.14
    },
    {
        _id: new mongoose_1.default.Types.ObjectId(),
        name: 'Running',
        category: constants_1.EExerciseCategory.AEROBIC,
        outdoorOnly: true,
        quantityType: constants_1.EQuantityType.DISTANCE,
        quantityUnit: 'km',
        calorieBurnRatePerUnit: 76.9
    },
    {
        _id: new mongoose_1.default.Types.ObjectId(),
        name: 'Walking',
        category: constants_1.EExerciseCategory.AEROBIC,
        outdoorOnly: true,
        quantityType: constants_1.EQuantityType.DISTANCE,
        quantityUnit: 'km',
        calorieBurnRatePerUnit: 46.9
    },
    {
        _id: new mongoose_1.default.Types.ObjectId(),
        name: 'Cycling',
        category: constants_1.EExerciseCategory.AEROBIC,
        outdoorOnly: true,
        quantityType: constants_1.EQuantityType.DISTANCE,
        quantityUnit: 'km',
        calorieBurnRatePerUnit: 29.2
    },
    {
        _id: new mongoose_1.default.Types.ObjectId(),
        name: 'Swimming',
        category: constants_1.EExerciseCategory.AEROBIC,
        outdoorOnly: false,
        quantityType: constants_1.EQuantityType.QUANTITATIVE,
        quantityUnit: 'laps',
        calorieBurnRatePerUnit: 19.8
    },
    {
        _id: new mongoose_1.default.Types.ObjectId(),
        name: 'Yoga',
        category: constants_1.EExerciseCategory.ANAEROBIC,
        outdoorOnly: false,
        quantityType: constants_1.EQuantityType.TIME,
        quantityUnit: 'mins',
        calorieBurnRatePerUnit: 3.75
    },
    {
        _id: new mongoose_1.default.Types.ObjectId(),
        name: 'Weightlifting',
        category: constants_1.EExerciseCategory.ANAEROBIC,
        outdoorOnly: false,
        quantityType: constants_1.EQuantityType.TIME,
        quantityUnit: 'min',
        calorieBurnRatePerUnit: 2.67
    }
];
exports.default = ExerciseSeed;
//# sourceMappingURL=exerciseSeed.js.map