/**
 * GET   /api/users                    -> list of all users
 * GET   /api/users/me                 -> get info for req.user
 * GET   /api/users/me/expense-pools/  -> list of expense pools for req.user
 * GET   /api/users/:id                -> get info for req.params.id user
 */

import express from 'express';
import controller from './user.controller';
const router = express.Router();

router.get('/', controller.all);

router.get('/me', controller.me);
router.get('/me/expense-pools', controller.myPools);

router.get('/:id', controller.get);

export default router;

