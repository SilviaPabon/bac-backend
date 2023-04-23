import { Router } from 'express';
const router = Router();

import { handlerLogin } from '../controllers/session.controllers';
import {
	handlerDeleteResident,
	handlerRegisterResident,
	handlerSignUp,
	handlerUpdateResident,
} from '../controllers/users.controller';
import { mustProvideTokenGuard } from '../middlewares/session.middlewares';
//import { mustProvideTokenAdmin } from '../middlewares/session.middlewares';

// Session
router.post('/session/login', handlerLogin);

// Admin user
router.post('/admin/register', handlerSignUp);

// Guard user
router.post(
	'/staff/register-resident',
	mustProvideTokenGuard,
	handlerRegisterResident,
);
router.put(
	'/staff/update-resident/:id',
	mustProvideTokenGuard,
	handlerUpdateResident,
);
router.delete(
	'/staff/delete-resident/:id',
	mustProvideTokenGuard,
	handlerDeleteResident,
);

export default router;
