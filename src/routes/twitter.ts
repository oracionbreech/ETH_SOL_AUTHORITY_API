import { Router } from 'express';
import { config } from 'dotenv';
config();
const router = Router();

// controllers
import requestAuth from '../controllers/twitter/requestAuth';
import authCallback from '../controllers/twitter/authCallback';
import verifyUser from '../controllers/twitter/verifyUser';

const TwitterRoutes = router.get('/', requestAuth).get('/auth/userToken', authCallback).get('/verify', verifyUser);

export default TwitterRoutes;
