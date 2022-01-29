import { Router } from 'express';
import { Request, Response } from 'express';

// Routes
import FlowerRoutes from './flowers';

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

router.use('/flowers', FlowerRoutes);

export default router;
