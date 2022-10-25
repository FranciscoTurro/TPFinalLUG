import { Router } from 'express';
import cartRoutes from './cart';

const router = Router();
router.use('/cart', cartRoutes);

export default router;
