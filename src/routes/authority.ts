import { Router } from 'express';
import { config } from 'dotenv';
import getRequirements from '../controllers/authority/getRequirements';
config();
const router = Router();

// controllers
const AuthorityRoutes = router.get('/', getRequirements);

export default AuthorityRoutes;
