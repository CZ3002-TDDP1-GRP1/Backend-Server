"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const crypto_1 = __importDefault(require("crypto"));
const cron_1 = require("cron");
const seed_1 = __importDefault(require("./data/seed"));
const app_1 = __importDefault(require("./app"));
const scheduledService_1 = __importDefault(require("./service/scheduledService"));
dotenv_1.default.config();
const mongoURL = process.env.MONGODB_URL || 'mongodb://localhost:27017';
const dbName = process.env.MONGODB_NAME || 'everydayFitDB';
mongoose_1.default
    .connect(`${mongoURL}/${dbName}`)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Could not connect to MongoDB: ', err));
const port = process.env.SERVER_PORT;
// Setup cron
const pollForecastSchedule = process.env.SCHEDULE_NEA_API || '* */2 * * *';
const forecastSchedule = new cron_1.CronJob(pollForecastSchedule, scheduledService_1.default.RetrieveForecastsFromAPI);
forecastSchedule.start();
// start the express server
app_1.default.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`);
});
const genJWTSecret = process.env.GENERATE_JWT_SECRETKEY || false;
if (genJWTSecret === 'true') {
    console.log(`GENERATED JWT SK: ${crypto_1.default.randomBytes(64).toString('hex')}`);
}
const genExercise = process.env.GENERATE_EXERCISE_DATABASE || false;
if (genExercise === 'true') {
    seed_1.default();
}
//# sourceMappingURL=index.js.map