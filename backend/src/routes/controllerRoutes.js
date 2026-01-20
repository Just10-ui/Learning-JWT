import { Router } from 'express';
import { login, signup } from '../controller/controller.js';

const controllerRoutes = Router();

controllerRoutes.post('/signup', signup);
controllerRoutes.post('/login', login);

export default controllerRoutes;