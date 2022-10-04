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
const authService_1 = __importDefault(require("../service/authService"));
const Register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name, password } = req.body;
    console.log(req.body);
    console.log("Register is being called from backend server ...");
    const emailRegex = "[a-zA-Z0-9_\\.\\+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-\\.]+";
    if (!email.match(emailRegex)) {
        console.error(`AuthController: Login: Invalid email string: ${email}`);
        return res.status(500).json({ message: 'Email must be in name@email.com format' });
    }
    else if (email.length > 300) {
        console.error(`AuthController: Login: Invalid email string: ${email}`);
        return res.status(500).json({ message: 'Email is too long' });
    }
    if (password.length < 6 || password.lenth > 50) {
        console.error(`AuthController: Login: Invalid password string: ${email}`);
        return res.status(500).json({ message: 'Password should be within length of 6 - 50.' });
    }
    try {
        const tokens = yield authService_1.default.Register(email, name, password);
        res.json(tokens);
    }
    catch (err) {
        console.log("Error occurred while trying to register");
        res.status(500).json({ message: err.message });
    }
});
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    console.log(req.body);
    const emailRegex = "[a-zA-Z0-9_\\.\\+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-\\.]+";
    if (!email.match(emailRegex)) {
        console.error(`AuthController: Login: Invalid email string: ${email}`);
        return res.status(500).json({ message: 'Email must be in name@email.com format' });
    }
    else if (email.length > 300) {
        console.error(`AuthController: Login: Invalid email string: ${email}`);
        return res.status(500).json({ message: 'Email is too long' });
    }
    if (password.length < 6 || password.length > 50) {
        console.error(`AuthController: Login: Invalid password string: ${email}`);
        return res.status(500).json({ message: 'Password should be within length of 6 - 50.' });
    }
    try {
        const result = yield authService_1.default.Login(email, password);
        res.json(result);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
const Refresh = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userID = req.params.user;
    try {
        const result = yield authService_1.default.RefreshToken(userID);
        res.json(result);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
const SetExpoToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userID = req.params.user;
    const { expoToken } = req.body;
    if (!expoToken) {
        console.error(`AuthController: Login: Invalid expo token: ${expoToken}`);
        return res.status(500).json({ message: 'Expo token detaill is null' });
    }
    try {
        const result = yield authService_1.default.SetUserExpoToken(userID, expoToken);
        res.json(result);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
const Logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userID = req.params.user;
    try {
        const result = yield authService_1.default.Logout(userID);
        res.json(result);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
const AuthController = {
    Register,
    Login,
    Refresh,
    SetExpoToken,
    Logout
};
exports.default = AuthController;
//# sourceMappingURL=authController.js.map