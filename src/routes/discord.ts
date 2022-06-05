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
import addRole from '../controllers/discord/addRole';
import getRolesByApp from '../controllers/discord/getRolesByApp';
import getME from '../controllers/discord/getMe';

const DiscordRoutes = router
  .post('/', requestCode)
  .post('/grant', requestTokenGrant)
  .get('/whitelist', getMembers)
  .get('/apps', getDiscordApps)
  .post('/add', addDiscordApp)
  .post('/add-role', addRole)
  .get('/app', getRolesByApp)
  .get('/me', getME);

export default DiscordRoutes;
