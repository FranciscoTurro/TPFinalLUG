import { Router } from 'express';
import cartRoutes from './cart';
import productRoutes from './products';
import providerRoutes from './providers';

const router = Router();
router.use('/cart', cartRoutes);
router.use('/products', productRoutes);
router.use('/providers', providerRoutes);

export default router;
