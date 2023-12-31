import { Router } from 'express';
import { Request, Response } from 'express';

// Routes
import DiscordRoutes from './discord';
import PharmaRoutes from './pharma';
import TwitterRoutes from './twitter';
import TwitterRoutesV2 from './twitterV2';
import UserRoutes from './user';
import WhitelistRoutes from './whitelist';
import AuctionRoutes from './auction';
import AuthorityRoutes from './authority';

const router = Router();

router.get('/health-check', (req: Request, res: Response) => {
  res.json({
    status: 'ok'
  });
});

router.get('/', (req: Request, res: Response) => {
  res.json({
    status: 'ok'
  });
});

router
  .use('/discord', DiscordRoutes)
  .use('/user', UserRoutes)
  .use('/twitter', TwitterRoutes)
  .use('/twitterV2', TwitterRoutesV2)
  .use('/authority', AuthorityRoutes)
  .use('/whitelist', WhitelistRoutes)
  .use('/pharma', PharmaRoutes)
  .use('/auction', AuctionRoutes);

export default router;
