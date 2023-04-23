import { Router } from 'express';
const router = Router();

import { handlerSignUp } from '../controllers/users.controller';
import { handlerLogin } from '../controllers/session.controllers';

// Admin user
router.post('/staff/signup', handlerSignUp);
router.post('/staff/login', handlerLogin);

export default router;
