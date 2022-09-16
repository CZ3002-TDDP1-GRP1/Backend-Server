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
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const refreshTokenRepo_1 = __importDefault(require("../repo/refreshTokenRepo"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_REFRESH_SK || null;
const authenticateRefreshToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    if (!JWT_SECRET) {
        console.error(`Middleware: AuthenticateRefreshToken: No JWT Key`);
        res.status(500).json({ message: 'An error occured while verifying token' });
        return;
    }
    if (!token) {
        console.info(`Middleware: AuthenticateRefreshToken: No Token Provided`);
        res.status(401).json({ message: 'No token provided' });
        return;
    }
    jsonwebtoken_1.default.verify(token, JWT_SECRET, (err, tokenContent) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            res.status(401).send('Error verifying refresh token');
            return;
        }
        const refreshToken = yield refreshTokenRepo_1.default.GetRefreshTokenByToken(token);
        if (!refreshToken) {
            res.status(401).json({ message: 'Invalid refresh token, please reauthenticate' });
            return;
        }
        // Check expiry
        if (refreshToken.expiresAt < new Date()) {
            res.status(401).json({ message: 'Invalid refresh token, please reauthenticate' });
            return;
        }
        const newExpiry = new Date();
        newExpiry.setDate(newExpiry.getDate() + 7);
        refreshToken.expiresAt = newExpiry;
        try {
            yield refreshToken.save();
        }
        catch (err) {
            console.error('Middleware: AuthenticateRefreshToken: Error extending refresh token expiry');
            res.status(500).json({ message: 'An error occured while refreshing token' });
        }
        req.params.user = tokenContent.userID;
        next();
    }));
});
exports.default = authenticateRefreshToken;
//# sourceMappingURL=verifyRefreshJWT.js.map