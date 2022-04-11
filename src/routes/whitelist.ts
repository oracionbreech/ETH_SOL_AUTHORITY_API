import { Router } from 'express';
import { config } from 'dotenv';
import registerWhitelist from '../controllers/whitelisted/registerWhitelist';
config();
const router = Router();

// controllers

const WhitelistRoutes = router.post('/add', registerWhitelist);

export default WhitelistRoutes;
