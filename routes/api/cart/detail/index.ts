import { Router } from 'express';
import { cartController } from '../../../../controllers/cart';

const router = Router();

router.post('/', cartController.addItem);

export default router;
