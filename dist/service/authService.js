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
const userRepo_1 = __importDefault(require("../repo/userRepo"));
const refreshTokenRepo_1 = __importDefault(require("../repo/refreshTokenRepo"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
dotenv_1.default.config();
const JWT_GENERAL_SK = process.env.JWT_GENERAL_SK || null;
const JWT_REFRESH_SK = process.env.JWT_REFRESH_SK || null;
const GenerateGeneralJWTToken = (userID) => {
    if (!JWT_GENERAL_SK) {
        console.error('AuthService: GenerateGeneralJWTToken: No JWT Secret');
        throw new Error('An error occured while trying to generate token');
    }
    try {
        const token = jsonwebtoken_1.default.sign({ userID }, JWT_GENERAL_SK, { expiresIn: '1h' });
        return token;
    }
    catch (err) {
        console.error('AuthService: GenerateGeneralJWTToken: Failed to sign JWT Token');
        throw new Error('An error occured while trying to generate token');
    }
};
const GenerateRefreshJWTToken = (userID) => {
    if (!JWT_REFRESH_SK) {
        console.error('AuthService: GenerateRefreshJWTToken: No JWT Secret');
        throw new Error('An error occured while trying to generate refresh token');
    }
    try {
        const token = jsonwebtoken_1.default.sign({ userID, generatedAt: Date.now() }, JWT_REFRESH_SK, { expiresIn: '1h' });
        return token;
    }
    catch (err) {
        console.error('AuthService: GenerateRefreshJWTToken: Failed to sign refresh JWT Token');
        throw new Error('An error occured while trying to generate refresh token');
    }
};
const Register = (email, name, password) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield userRepo_1.default.GetUserByEmail(email.trim());
    if (existingUser) {
        console.info(`AuthService: Register: ${email} already has an account`);
        throw new Error('An account with this email already exists');
    }
    // Hash password
    let hashedPassword = null;
    try {
        hashedPassword = bcryptjs_1.default.hashSync(password, 10);
    }
    catch (err) {
        console.log(err);
        console.error(`AuthService: Register: An error occured while trying to hash password for ${email}`);
        throw new Error('An error occured while trying to register account');
    }
    let newUser = null;
    try {
        newUser = yield userRepo_1.default.CreateUser(email.trim(), name, hashedPassword);
    }
    catch (err) {
        console.error(`AuthService: Register: An error occured while trying to create account ${email}`);
        throw new Error('An error occured while trying to create account');
    }
    // Generate tokens
    try {
        const generalToken = GenerateGeneralJWTToken(newUser._id);
        const refreshToken = GenerateRefreshJWTToken(newUser._id);
        yield refreshTokenRepo_1.default.CreateRefreshToken(newUser._id, refreshToken);
        return { token: generalToken, refreshToken };
    }
    catch (err) {
        throw new Error('An error occured while generating authorization tokens');
    }
});
const Login = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userRepo_1.default.GetUserByEmail(email.trim());
    if (!user) {
        console.info(`AuthService: Login: Attempt to login for non-existent account ${email}`);
        return { success: false, message: 'Invalid login', token: '', refreshToken: '' };
    }
    if (!bcryptjs_1.default.compareSync(password, user.hashedPassword)) {
        console.info(`AuthService: Login: Failed login for account ${email}`);
        return { success: false, message: 'Invalid login', token: '', refreshToken: '' };
    }
    try {
        const generalToken = GenerateGeneralJWTToken(user._id);
        const refreshToken = GenerateRefreshJWTToken(user._id);
        yield refreshTokenRepo_1.default.CreateRefreshToken(user._id, refreshToken);
        return { success: true, message: 'Successfully logged in', token: generalToken, refreshToken };
    }
    catch (err) {
        console.error(`AuthService: Login: Error generating tokens for user ${email}`);
        throw new Error('An error occured while logging in');
    }
});
const RefreshToken = (userID) => __awaiter(void 0, void 0, void 0, function* () {
    if (!userID) {
        throw new Error('No user ID');
    }
    try {
        const newToken = GenerateGeneralJWTToken(userID);
        return { token: newToken };
    }
    catch (err) {
        throw new Error(err.message);
    }
});
const SetUserExpoToken = (userID, expoToken) => __awaiter(void 0, void 0, void 0, function* () {
    if (!userID) {
        throw new Error('No user ID');
    }
    const user = yield userRepo_1.default.GetUserByID(userID);
    if (!user) {
        throw new Error(`User of ID ${userID} not found`);
    }
    user.expoToken = expoToken;
    yield user.save();
    return { message: 'Successfully set expo token for user' };
});
const Logout = (userID) => __awaiter(void 0, void 0, void 0, function* () {
    if (!userID) {
        throw new Error('No user ID');
    }
    const user = yield userRepo_1.default.GetUserByID(userID);
    if (!user) {
        throw new Error(`User of ID ${userID} not found`);
    }
    try {
        user.expoToken = null;
        yield user.save();
        yield refreshTokenRepo_1.default.DeleteRefreshTokensForUser(userID);
    }
    catch (err) {
        console.error(`AuthService: Logout: ${err.message}`);
        throw new Error('An error occured while logging out');
    }
    return { message: 'Successfully logged out' };
});
const AuthService = {
    Register,
    Login,
    RefreshToken,
    SetUserExpoToken,
    Logout,
};
exports.default = AuthService;
//# sourceMappingURL=authService.js.map