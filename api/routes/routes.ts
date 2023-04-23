import { Router } from 'express';
const router = Router();

import {
	handlerSignUp,
	handlerRegisterResident,
} from '../controllers/users.controller';
import { handlerLogin } from '../controllers/session.controllers';

// Admin user
router.post('/staff/signup', handlerSignUp);
router.post('/staff/login', handlerLogin);
router.post('/staff/register-resident', handlerRegisterResident);

export default router;
