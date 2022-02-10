import { Router } from 'express';
import { config } from 'dotenv';
config();
const router = Router();

// controllers

import getAllFlowers from '../controllers/flowers/getAllFlowers';
import sourceAllFlowers from '../controllers/flowers/sourceAllFlowers';
import getAllFlowersV2 from '../controllers/flowers/getAllFlowersV2';
import getMintedInfo from '../controllers/flowers/getMintedInfo';

const FlowerRoutes = router
  .get('/', getAllFlowers)
  .post('/source', sourceAllFlowers)
  .get('/v2', getAllFlowersV2)
  .get('/mint-info/:address', getMintedInfo);

export default FlowerRoutes;
