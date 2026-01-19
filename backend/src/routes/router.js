import { Router } from 'express';
import controllerRoutes from './controllerRoutes.js';

const router = Router();

router.use('/users', controllerRoutes);

export default router;