import { Router } from 'express';
import { config } from 'dotenv';
import getRequirements from '../controllers/authority/initiateRequirements';
import initRequirements from '../controllers/authority/getRequirements';
import updateRequirements from '../controllers/authority/updateRequirements';
config();
const router = Router();

// controllers
const AuthorityRoutes = router
  .get('/', getRequirements)
  .get('/initiate', initRequirements)
  .post('/update', updateRequirements);

export default AuthorityRoutes;
