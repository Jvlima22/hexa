import { Router } from 'express';
import { authController } from '../controllers/authController';

const router = Router();

// POST /api/v1/auth/register
router.post('/register', authController.register);

// POST /api/v1/auth/login
router.post('/login', authController.login);

// GET /api/v1/auth/me  (requer Bearer token)
router.get('/me', authController.me);

export default router;
