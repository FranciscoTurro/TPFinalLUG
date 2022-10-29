import { Router } from 'express';
import { cartController } from '../../../controllers/cart';
import detailRoutes from './detail';

const router = Router();

router.use('/detail', detailRoutes);
router.post('/', cartController.addCart);
router.delete('/', cartController.removeCart);

export default router;
