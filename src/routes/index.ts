import { Router } from 'express';
import authRouter from './AuthRoutes';

const router = Router();

// Agrupa las rutas bajo '/api'
router.use('/auth', authRouter);

export default router;
