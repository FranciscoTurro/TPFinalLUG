import { Router } from 'express';
import { providerController } from '../../../controllers/provider';

const router = Router();

router.post('/', providerController.addProvider);
router.put('/', providerController.editProvider);
router.delete('/', providerController.deleteProvider);

export default router;
