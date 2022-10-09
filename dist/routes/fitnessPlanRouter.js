"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const express_1 = __importDefault(require("express"));
const fitnessPlanController_1 = __importDefault(require("../controller/fitnessPlanController"));
const router = express_1.default.Router();
exports.default = router;
router.get('/:user', fitnessPlanController_1.default.GetFitnessPlans);
router.get('/date/:date&:user', fitnessPlanController_1.default.GetDateFitnessPlanForUser);
router.post('/:date&:user/activity', fitnessPlanController_1.default.AddActivityToFitnessPlan);
router.delete('/:date&:user/activity', fitnessPlanController_1.default.DeleteActivityFromFitnessPlan);
router.patch('/:date&:user/activity', fitnessPlanController_1.default.EditActivityFromFitnessPlan);
//# sourceMappingURL=fitnessPlanRouter.js.map