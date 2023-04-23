import { Router } from 'express';
const router = Router();

import {
	handlerSignUp,
	handlerRegisterResident,
	handlerDeleteResident,
} from '../controllers/users.controller';
import { handlerLogin } from '../controllers/session.controllers';
import { mustProvideToken } from '../middlewares/session.middlewares';

// Admin user
router.post('/staff/signup', handlerSignUp);
router.post('/staff/login', handlerLogin);
router.post(
	'/staff/register-resident',
	mustProvideToken,
	handlerRegisterResident,
);
router.delete('/staff/delete/:id', handlerDeleteResident);

export default router;
