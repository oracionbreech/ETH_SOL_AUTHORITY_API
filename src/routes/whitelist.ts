import { Router } from 'express';
import { config } from 'dotenv';

// Controllers
import registerWhitelist from '../controllers/whitelisted/registerWhitelist';
import getWhitelisted from '../controllers/whitelisted/getWhitelisted';
import getWhitelistedById from '../controllers/whitelisted/getWhitelistedById';

config();
const router = Router();

// controllers
const WhitelistRoutes = router.post('/add', registerWhitelist).get('/', getWhitelisted).get('/:id', getWhitelistedById);

export default WhitelistRoutes;
