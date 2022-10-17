import express from 'express';
import AuthRouter from './routes/authRouter';
import ForecastRouter from './routes/forecastRouter';
import FitnessPlanRouter from './routes/fitnessPlanRouter';
import ExerciseRouter from './routes/exerciseRouter';
import path from 'path';
import cors from 'cors';

const allowedOrigins=['http://localhost:*'];

const options: cors.CorsOptions = {
    origin: allowedOrigins
  };

const app = express();
app.use(cors(options));
app.use(express.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

// Configure routes
app.use('/auth', AuthRouter);
app.use('/forecasts', ForecastRouter);
app.use('/plan', FitnessPlanRouter);
app.use('/exercise', ExerciseRouter);

export {app as default};