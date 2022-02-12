import { Router } from 'express';
import { config } from 'dotenv';
config();
const router = Router();

// controllers
import sourceNFT from '../controllers/nft/sourceNFT';

const NFTRoutes = router.post('/', sourceNFT);

export default NFTRoutes;
