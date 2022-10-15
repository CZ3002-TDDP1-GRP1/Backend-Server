import Express from 'express';
import ExerciseController from '../controller/exerciseController';

const router = Express.Router();

router.get('/', ExerciseController.GetAllExercises);
router.get('/alt/:exerciseID', ExerciseController.GetAlternativeForExerciseID);
router.get('/:exerciseName', ExerciseController.GetExercise);
router.get('/id/:exerciseID', ExerciseController.GetExerciseByID);

export { router as default };