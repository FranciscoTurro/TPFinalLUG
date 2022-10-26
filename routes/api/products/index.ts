import { Router } from 'express';
import { productController } from '../../../controllers/product';

const router = Router();

router.post('/', productController.addProduct);

export default router;
