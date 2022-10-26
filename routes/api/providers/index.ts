import { Router } from 'express';
import { Model } from 'mongoose';
import { providerController } from '../../../controllers/provider';

const router = Router();

router.post('/', providerController.addProvider);

export default router;
