import { Router } from 'express';
import { Request, Response } from 'express';
import DiscordRoutes from './discord';

// Routes
import FlowerRoutes from './flowers';
import NFTRoutes from './nft';

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

router.use('/flowers', FlowerRoutes).use('/nft', NFTRoutes).use('/discord', DiscordRoutes);

export default router;
