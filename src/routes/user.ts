import { Router } from 'express';
import { config } from 'dotenv';
config();
const router = Router();

// controllers
import signUp from '../controllers/users/signUp';

const UserRoutes = router.post('/', signUp);

export default UserRoutes;
