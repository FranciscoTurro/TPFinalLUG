import { Router } from 'express';
import { productController } from '../../../controllers/product';

const router = Router();

router.post('/', productController.addProduct);
router.put('/', productController.editProduct);
export default router;
