import { Router } from 'express';
const router = Router();

import {
	handleGetResidents,
	handleStaffSignup,
} from '../controllers/admin.controllers.js';
import { handlerLogin } from '../controllers/session.controllers.js';
import {
	handlerDeleteResident,
	handlerRegisterResident,
	handlerUpdateResident,
} from '../controllers/users.controller.js';
import {
	mustProvideTokenAdmin,
	mustProvideTokenGuard,
} from '../middlewares/session.middlewares.js';

// Session
router.post('/session/login', handlerLogin);

// Admin user
// router.post('/admin/register', handlerSignUp);
router.post('/admin/register-staff', handleStaffSignup);
router.get('/admin/residents', mustProvideTokenAdmin, handleGetResidents);

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
