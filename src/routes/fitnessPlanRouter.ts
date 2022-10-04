import Express from 'express';
import VerifyJWTToken from '../middleware/verifyJWT';
import FitnessPlanController from '../controller/fitnessPlanController';

const router = Express.Router();

router.get('/', FitnessPlanController.GetFitnessPlans);
router.get('/:date', FitnessPlanController.GetDateFitnessPlanForUser);
router.post('/:date&:user/activity', FitnessPlanController.AddActivityToFitnessPlan);
router.delete('/:date&:user/activity', FitnessPlanController.DeleteActivityFromFitnessPlan);
router.patch('/:date&:user/activity', FitnessPlanController.EditActivityFromFitnessPlan);

export { router as default };