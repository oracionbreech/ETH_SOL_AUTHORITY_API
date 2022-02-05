import { Router } from 'express';
import { config } from 'dotenv';
config();
const router = Router();

// controllers

import getAllFlowers from '../controllers/flowers/getAllFlowers';
import sourceAllFlowers from '../controllers/flowers/sourceAllFlowers';

const FlowerRoutes = router.get('/', getAllFlowers).post('/source', sourceAllFlowers);

export default FlowerRoutes;
