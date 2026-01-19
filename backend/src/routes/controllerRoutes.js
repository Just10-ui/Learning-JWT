import { Router } from 'express';
import { signup } from '../controller/controller.js';

const controllerRoutes = Router();

controllerRoutes.post('/signup', signup);

export default controllerRoutes;