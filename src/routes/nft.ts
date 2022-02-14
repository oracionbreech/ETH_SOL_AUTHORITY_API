import { Router } from 'express';
import { config } from 'dotenv';
config();
const router = Router();

// controllers
import sourceNFT from '../controllers/nft/sourceNFT';
import getNFT from '../controllers/nft/getNFT';
import sourceNFTMetadataFirst from '../controllers/nft/sourceNFTMetadataFirst';

const NFTRoutes = router
  .post('/', sourceNFT)
  .get('/:candyMachineId', getNFT)
  .get('/metadata-first/:candyMachineId', sourceNFTMetadataFirst);

export default NFTRoutes;
