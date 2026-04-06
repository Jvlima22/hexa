import { Router } from 'express';
import { checkoutController } from '../controllers/checkoutController';

const router = Router();

router.post('/', checkoutController.create);

export default router;
