import { Router } from 'express';
const router = Router();

import {
	handleGetResidents,
	handleStaffSignup,
} from '../controllers/admin.controllers.js';
import {
	handleRefreshToken,
	handleWhoami,
	handlerLogin,
} from '../controllers/session.controllers.js';
import {
	handlerDeleteResident,
	handlerRegisterResident,
	handlerUpdateResident,
} from '../controllers/users.controller.js';
import {
	mustProvideAccessToken,
	mustProvideRefreshToken,
	mustProvideTokenAdmin,
	mustProvideTokenGuard,
} from '../middlewares/session.middlewares.js';

// Session
router.post('/session/login', handlerLogin);
router.get('/session/whoami', mustProvideAccessToken, handleWhoami);
router.get('/session/refresh', mustProvideRefreshToken, handleRefreshToken);

// Shared routes
router.get('/residents', mustProvideAccessToken, handleGetResidents);

// Admin user
// router.post('/admin/register', handlerSignUp);
router.post('/admin/register-staff', mustProvideTokenAdmin, handleStaffSignup);

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
