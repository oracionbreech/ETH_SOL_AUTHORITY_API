import { Router } from 'express';
import { config } from 'dotenv';
config();
const router = Router();

// controllers
import sourceNFT from '../controllers/nft/sourceNFT';
import getNFT from '../controllers/nft/getNFT';

const NFTRoutes = router.post('/', sourceNFT).get('/:candyMachineId', getNFT);

export default NFTRoutes;
