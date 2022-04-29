import { Router } from 'express';
import { config } from 'dotenv';

// Controllers
import addPharma from '../controllers/cyberpharma/addPharma';
config();
const router = Router();

// controllers
const PharmaRoutes = router.post('/', addPharma);

export default PharmaRoutes;
