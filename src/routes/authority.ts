import { Router } from 'express';
import { config } from 'dotenv';
import getRequirements from '../controllers/authority/initiateRequirements';
import initRequirements from '../controllers/authority/getRequirements';
config();
const router = Router();

// controllers
const AuthorityRoutes = router.get('/', getRequirements).get('/initiate', initRequirements);

export default AuthorityRoutes;
