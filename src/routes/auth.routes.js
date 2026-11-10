//Imprta Express y el controlador que procesa el inicio de sesion
import express from 'express';
import { login } from '../controllers/auth.controller.js';

//Crea un router para las rutas de autenticacion
const router = express.Router();

//Define POST para logearse
router.post('/login', login);

//Exporta el router
export default router;