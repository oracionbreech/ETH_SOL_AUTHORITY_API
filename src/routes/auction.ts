import { Router } from 'express';
import { config } from 'dotenv';

// Controllers
import getAuctions from '../controllers/auction/getAuctions';
import registerAuctionInfo from '../controllers/auction/registerAuctionInfo';
import getAuctionByID from '../controllers/auction/getAuctionByID';

config();
const router = Router();

// controllers
const AuctionRoutes = router.get('/', getAuctions).post('/', registerAuctionInfo).get('/:id', getAuctionByID);

export default AuctionRoutes;
