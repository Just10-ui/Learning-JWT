import { Router } from 'express';
import { getUser, login, signup } from '../controller/controller.js';
import { verifyToken } from '../middleware/middleware.js';

const controllerRoutes = Router();

controllerRoutes.post('/signup', signup);
controllerRoutes.post('/login', login);
controllerRoutes.get('/profile', verifyToken, getUser);

export default controllerRoutes;