import { Router } from 'express';
import { config } from 'dotenv';
import getRequirements from '../controllers/authority/getRequirements';
import initRequirements from '../controllers/authority/initRequirements';
import updateRequirements from '../controllers/authority/updateRequirements';
config();
const router = Router();

// controllers
const AuthorityRoutes = router
  .get('/', getRequirements)
  .get('/initiate', initRequirements)
  .post('/update', updateRequirements);

export default AuthorityRoutes;
