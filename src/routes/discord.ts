import { Router } from 'express';
import { config } from 'dotenv';
config();
const router = Router();

// controllers
import requestCode from '../controllers/discord/requestCode';
import requestTokenGrant from '../controllers/discord/requestTokenGrant';
import getMembers from '../controllers/discord/getMembers';
import addDiscordApp from '../controllers/discord/addDiscordApp';

const DiscordRoutes = router
  .get('/', requestCode)
  .get('/roles', requestTokenGrant)
  .get('/members', getMembers)
  .post('/add', addDiscordApp);

export default DiscordRoutes;
