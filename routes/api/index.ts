import { Router } from 'express';
import cartRoutes from './cart';
import productRoutes from './products';

const router = Router();
router.use('/cart', cartRoutes);
router.use('products', productRoutes);

export default router;
