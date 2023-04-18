import { Router } from 'express';
const router = Router();

import { handlerSignUp } from '../controllers/users.controller';

// Admin user
router.post('/staff/signup', handlerSignUp);

export default router;
