"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const refreshTokenSchema = new mongoose_1.default.Schema({
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'user' },
    token: { type: String, unique: true },
    generatedAt: Date,
    expiresAt: Date,
});
const RefreshToken = mongoose_1.default.model('refreshToken', refreshTokenSchema);
exports.default = RefreshToken;
//# sourceMappingURL=refreshToken.js.map