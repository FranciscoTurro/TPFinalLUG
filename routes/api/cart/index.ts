import { Router } from 'express';
import detailRoutes from './detail';

const router = Router();

router.use('/detail', detailRoutes);

export default router;
