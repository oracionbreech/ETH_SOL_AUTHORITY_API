import { Router } from 'express';
import { Request, Response } from 'express';
import AuthorityRoutes from './authority';

// Routes
import DiscordRoutes from './discord';
import TwitterRoutes from './twitter';
import UserRoutes from './user';

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
  .use('/authority', AuthorityRoutes);

export default router;
