"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const express_1 = __importDefault(require("express"));
const verifyRefreshJWT_1 = __importDefault(require("../middleware/verifyRefreshJWT"));
const verifyJWT_1 = __importDefault(require("../middleware/verifyJWT"));
const authController_1 = __importDefault(require("../controller/authController"));
const router = express_1.default.Router();
exports.default = router;
router.post('/register', authController_1.default.Register);
router.post('/login', authController_1.default.Login);
router.post('/refresh', verifyRefreshJWT_1.default, authController_1.default.Refresh);
router.post('/expoToken', verifyJWT_1.default, authController_1.default.SetExpoToken);
router.post('/logout', verifyJWT_1.default, authController_1.default.Logout);
//# sourceMappingURL=authRouter.js.map