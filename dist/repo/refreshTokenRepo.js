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
const refreshToken_1 = __importDefault(require("../models/refreshToken"));
const CreateRefreshToken = (userID, token) => __awaiter(void 0, void 0, void 0, function* () {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
    const newRefreshToken = new refreshToken_1.default({
        user: userID,
        token,
        generatedAt: new Date(),
        expiresAt: expiry,
    });
    try {
        yield newRefreshToken.save();
    }
    catch (err) {
        console.error(`RefreshTokenRepo: CreateRefreshToken: An error occured while saving refresh token`);
        throw new Error('An error occured while saving refresh token');
    }
});
const GetRefreshTokenByToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const refreshToken = yield refreshToken_1.default.findOne({ token });
        return refreshToken;
    }
    catch (err) {
        console.error(`RefreshTokenRepo: GetRefreshTokenByToken: An error occured while retrieving token ${token}`);
        throw new Error('An error occured while retrieving refresh token');
    }
});
const DeleteRefreshTokensForUser = (userID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield refreshToken_1.default.deleteMany({ user: userID });
    }
    catch (err) {
        console.error(`RefreshTokenRepo: DeleteRefreshTokensForUser: An error occured while deleting token for ${userID}`);
        throw new Error('An error occured while retrieving refresh token');
    }
});
const RefreshTokenRepo = {
    CreateRefreshToken,
    GetRefreshTokenByToken,
    DeleteRefreshTokensForUser
};
exports.default = RefreshTokenRepo;
//# sourceMappingURL=refreshTokenRepo.js.map