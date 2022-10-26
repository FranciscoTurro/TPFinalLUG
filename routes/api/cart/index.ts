import { Router } from 'express';
import { cartController } from '../../../controllers/cart';

const router = Router();

router.post('/', cartController.addItem); //NEED TO CHANGE THIS ROUTE. EXPLANATION IN CONSIGNA.TXT

export default router;
