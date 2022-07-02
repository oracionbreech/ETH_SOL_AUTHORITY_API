import { Router } from 'express';
import { config } from 'dotenv';

// Controllers
import getAuctions from '../controllers/auction/getAuctions';
import registerAuctionInfo from '../controllers/auction/registerAuctionInfo';

config();
const router = Router();

// controllers
const AuctionRoutes = router.get('/', getAuctions).post('/', registerAuctionInfo);

export default AuctionRoutes;
