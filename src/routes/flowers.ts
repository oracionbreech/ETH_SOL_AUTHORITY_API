import { Router } from 'express';
import { config } from 'dotenv';
config();
const router = Router();

// controllers

import getAllFlowers from '../controllers/flowers/getAllFlowers';

const FlowerRoutes = router.get('/', getAllFlowers);

export default FlowerRoutes;
