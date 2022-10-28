import { Router } from 'express';
import { productController } from '../../../controllers/product';

const router = Router();

router.post('/', productController.addProduct);
router.put('/', productController.editProduct);
router.delete('/', productController.deleteProduct);

export default router;
