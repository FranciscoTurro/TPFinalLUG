import { Router } from 'express';
import { cartController } from '../../../../controllers/cart';

const router = Router();

router.post('/', cartController.addItem);
router.delete('/', cartController.removeItem);

export default router;
