"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const constants_1 = require("./constants");
const exerciseSchema = new mongoose_1.default.Schema({
    name: String,
    category: { type: String, enum: Object.values(constants_1.EExerciseCategory) },
    outdoorOnly: Boolean,
    quantityType: { type: String, enum: Object.values(constants_1.EQuantityType) },
    quantityUnit: String,
    calorieBurnRatePerUnit: Number,
});
const Exercise = mongoose_1.default.model('exercise', exerciseSchema);
exports.default = Exercise;
//# sourceMappingURL=exercise.js.map