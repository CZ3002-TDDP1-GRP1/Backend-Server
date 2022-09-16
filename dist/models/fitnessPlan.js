"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const activitySchema = new mongoose_1.default.Schema({
    exerciseID: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'exercise' },
    totalQuantity: Number,
    sets: Number,
    done: Boolean,
});
const fitnessPlanSchema = new mongoose_1.default.Schema({
    date: Date,
    owner: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'user' },
    activities: [activitySchema],
});
const FitnessPlan = mongoose_1.default.model('fitnessPlan', fitnessPlanSchema);
exports.default = FitnessPlan;
//# sourceMappingURL=fitnessPlan.js.map