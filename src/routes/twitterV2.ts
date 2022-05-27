import { Router } from 'express';
import { config } from 'dotenv';
config();
const router = Router();

// controllers
import requestAuthV2 from '../controllers/twitter/requestAuthV2';
import requestAccessToken from '../controllers/twitter/requestAccessToken';
import verifyUserV2 from '../controllers/twitter/verifyUserV2';

export const TwitterRoutesV2 = router
  .get('/', requestAuthV2)
  .post('/access-token', requestAccessToken)
  .get('/verify', verifyUserV2);

export default TwitterRoutesV2;
