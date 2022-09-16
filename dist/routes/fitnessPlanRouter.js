"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const express_1 = __importDefault(require("express"));
const verifyJWT_1 = __importDefault(require("../middleware/verifyJWT"));
const fitnessPlanController_1 = __importDefault(require("../controller/fitnessPlanController"));
const router = express_1.default.Router();
exports.default = router;
router.get('/', verifyJWT_1.default, fitnessPlanController_1.default.GetFitnessPlans);
router.get('/:date', verifyJWT_1.default, fitnessPlanController_1.default.GetDateFitnessPlanForUser);
router.post('/:date/activity', verifyJWT_1.default, fitnessPlanController_1.default.AddActivityToFitnessPlan);
router.delete('/:date/activity', verifyJWT_1.default, fitnessPlanController_1.default.DeleteActivityFromFitnessPlan);
router.patch('/:date/activity', verifyJWT_1.default, fitnessPlanController_1.default.EditActivityFromFitnessPlan);
//# sourceMappingURL=fitnessPlanRouter.js.map