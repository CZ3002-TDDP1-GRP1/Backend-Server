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
const user_1 = __importDefault(require("../models/user"));
const CreateUser = (email, name, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const normalizedEmail = email.trim().toLowerCase();
    const newUser = new user_1.default({
        email: normalizedEmail,
        name,
        hashedPassword
    });
    try {
        yield newUser.save();
        return newUser;
    }
    catch (err) {
        console.error(`UserRepo: CreateUser: ${err.message}`);
        throw new Error(`An error occured while creating user account`);
    }
});
const GetUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const normalizedEmail = email.trim().toLowerCase();
    try {
        const user = yield user_1.default.findOne({ email: normalizedEmail });
        return user;
    }
    catch (err) {
        console.error(`UserRepo: GetUserByEmail: ${err.message}`);
        throw new Error(`An error occured while retrieving user by email`);
    }
});
const GetUserByID = (userID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findById(userID);
        return user;
    }
    catch (err) {
        console.error(`UserRepo: GetUserByID: ${err.message}`);
        throw new Error(`An error occured while retrieving user by ID`);
    }
});
const GetUsersByMultipleIDs = (userIDs) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.default.find({ _id: { $in: userIDs } });
        return users;
    }
    catch (err) {
        console.error(`UserRepo: GetUsersByMultipleIDs: ${err.message}`);
        throw new Error(`An error occured while retrieving users by ID`);
    }
});
const UserRepo = {
    CreateUser,
    GetUserByEmail,
    GetUserByID,
    GetUsersByMultipleIDs
};
exports.default = UserRepo;
//# sourceMappingURL=userRepo.js.map