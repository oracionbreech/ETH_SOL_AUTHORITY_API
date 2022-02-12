import { Router } from 'express';
import { config } from 'dotenv';
config();
const router = Router();

// controllers
import getAllFlowers from '../controllers/flowers/getAllFlowers';
import getMintedInfo from '../controllers/flowers/getMintedInfo';

const FlowerRoutes = router.get('/', getAllFlowers).get('/mint-info/:address', getMintedInfo);

export default FlowerRoutes;
