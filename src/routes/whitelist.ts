import { Router } from 'express';
import { config } from 'dotenv';
import registerWhitelist from '../controllers/whitelisted/registerWhitelist';
import getWhitelisted from '../controllers/whitelisted/getWhitelisted';

config();
const router = Router();

// controllers

const WhitelistRoutes = router.post('/add', registerWhitelist).get('/', getWhitelisted);

export default WhitelistRoutes;
