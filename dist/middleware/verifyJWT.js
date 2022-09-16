"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_GENERAL_SK;
const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!JWT_SECRET) {
        console.error(`Middleware: AuthenticateToken: No JWT Key`);
        res.status(500).json({ message: 'An error occured while verifying token' });
        return;
    }
    if (!token) {
        console.info(`Middleware: AuthenticateToken: No Token Provided`);
        res.status(401).json({ message: 'No token provided' });
        return;
    }
    jsonwebtoken_1.default.verify(token, JWT_SECRET, (err, tokenContent) => {
        if (err) {
            console.info(`Middleware: AuthenticateToken: Invalid Token`);
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }
        req.params.user = tokenContent.userID;
        next();
    });
};
exports.default = authenticateToken;
//# sourceMappingURL=verifyJWT.js.map