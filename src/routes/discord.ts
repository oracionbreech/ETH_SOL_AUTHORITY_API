import { Router } from 'express';
import { config } from 'dotenv';
config();
const router = Router();

// controllers
import requestCode from '../controllers/discord/requestCode';
import requestTokenGrant from '../controllers/discord/requestTokenGrant';
import getMembers from '../controllers/discord/getMembers';
import addDiscordApp from '../controllers/discord/addDiscordApp';
import getDiscordApps from '../controllers/discord/getDiscordApps';

const DiscordRoutes = router
  .post('/', requestCode)
  .post('/grant', requestTokenGrant)
  .get('/whitelist', getMembers)
  .get('/apps', getDiscordApps)
  .post('/add', addDiscordApp);

export default DiscordRoutes;
