"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const express_1 = __importDefault(require("express"));
const exerciseController_1 = __importDefault(require("../controller/exerciseController"));
const router = express_1.default.Router();
exports.default = router;
router.get('/', exerciseController_1.default.GetAllExercises);
router.get('/alt/:exerciseID', exerciseController_1.default.GetAlternativeForExerciseID);
router.get('/:exerciseName', exerciseController_1.default.GetExercise);
//# sourceMappingURL=exerciseRouter.js.map