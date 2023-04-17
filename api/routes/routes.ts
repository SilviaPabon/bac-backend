import { Router } from 'express';
const router = Router();

import { handlerGetUsers } from '../controllers/users.controller';

router.get('/example', handlerGetUsers);

export default router;
