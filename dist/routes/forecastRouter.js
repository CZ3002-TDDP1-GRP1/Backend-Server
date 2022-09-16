"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const express_1 = __importDefault(require("express"));
const forecastController_1 = __importDefault(require("../controller/forecastController"));
const router = express_1.default.Router();
exports.default = router;
router.get('/', forecastController_1.default.GetForecast);
//# sourceMappingURL=forecastRouter.js.map