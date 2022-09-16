"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const express_1 = __importDefault(require("express"));
const authRouter_1 = __importDefault(require("./routes/authRouter"));
const forecastRouter_1 = __importDefault(require("./routes/forecastRouter"));
const fitnessPlanRouter_1 = __importDefault(require("./routes/fitnessPlanRouter"));
const exerciseRouter_1 = __importDefault(require("./routes/exerciseRouter"));
const path_1 = __importDefault(require("path"));
const app = express_1.default();
exports.default = app;
app.use(express_1.default.json());
app.set('views', path_1.default.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
// Configure routes
app.use('/auth', authRouter_1.default);
app.use('/forecasts', forecastRouter_1.default);
app.use('/plan', fitnessPlanRouter_1.default);
app.use('/exercise', exerciseRouter_1.default);
//# sourceMappingURL=app.js.map