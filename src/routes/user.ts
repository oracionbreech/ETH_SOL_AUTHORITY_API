import { Router } from 'express';
import { config } from 'dotenv';
config();
const router = Router();

// controllers
import signUp from '../controllers/users/signUp';
import signIn from '../controllers/users/signIn';

const UserRoutes = router.post('/sign-up', signUp).post('/sign-in', signIn);

export default UserRoutes;
