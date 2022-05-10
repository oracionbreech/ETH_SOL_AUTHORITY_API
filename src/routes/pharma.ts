import { Router } from 'express';
import { config } from 'dotenv';

// Controllers
import addPharma from '../controllers/cyberpharma/addPharma';
import getPharmaWhitelisted from '../controllers/cyberpharma/getWhitelisted';
import getPharmaWhitelistedById from '../controllers/cyberpharma/getWhitelistedById';
config();
const router = Router();

// controllers
const PharmaRoutes = router.post('/', addPharma).get('/', getPharmaWhitelisted).get('/:id', getPharmaWhitelistedById);

export default PharmaRoutes;
