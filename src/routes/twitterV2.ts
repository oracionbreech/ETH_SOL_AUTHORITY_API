import { Router } from 'express';
import { config } from 'dotenv';
config();
const router = Router();

// controllers
import requestAuthV2 from '../controllers/twitter/requestAuthV2';
import requestAccessToken from '../controllers/twitter/requestAccessToken';

export const TwitterRoutesV2 = router.get('/', requestAuthV2).post('/access-token', requestAccessToken);

export default TwitterRoutesV2;
