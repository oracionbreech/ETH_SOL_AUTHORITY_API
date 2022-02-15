import { Router } from 'express';
import { config } from 'dotenv';
config();
const router = Router();

// controllers
import sourceNFT from '../controllers/nft/sourceNFT';
import getNFT from '../controllers/nft/getNFT';
import sourceNFTMetadataFirst from '../controllers/nft/sourceNFTMetadataFirst';
import getNFTMintedInfo from '../controllers/nft/getNFTMintedInfo';

const NFTRoutes = router
  .post('/', sourceNFT)
  .get('/:candyMachineId', getNFT)
  .get('/minted-info/:address', getNFTMintedInfo)
  .post('/metadata-first', sourceNFTMetadataFirst);

export default NFTRoutes;
