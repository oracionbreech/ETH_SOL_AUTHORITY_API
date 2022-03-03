import { Router } from 'express';
import { config } from 'dotenv';
config();
const router = Router();

// controllers
import requestCode from '../controllers/discord/requestCode';
import requestTokenGrant from '../controllers/discord/requestTokenGrant';
import getMembers from '../controllers/discord/getMembers';
import getMembersV2 from '../controllers/discord/getMembersV2';

const DiscordRoutes = router
  .get('/', requestCode)
  .get('/roles', requestTokenGrant)
  .get('/members', getMembers)
  .get('/v2/members', getMembersV2);

export default DiscordRoutes;
