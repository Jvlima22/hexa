import { Router } from 'express';
import { webhookController } from '../controllers/webhookController';

const router = Router();

router.post('/mercadopago', webhookController.mercadopago);

export default router;
