import express from 'express';
import { authenticate, upload } from '../../middlewares/index.js';
import { validateBody } from '../../middlewares/index.js';
import { schemas } from '../../models/users.js';
import { authControllers } from '../../controllers/auth/index.js';

const { subscribe, getCurrent, updateUser } = authControllers;

const router = express.Router();

router.patch(
  '/update',
  authenticate,
  upload.single('avatar'),
  validateBody(schemas.updateNameSchema),
  updateUser,
);

router.get('/current', authenticate, getCurrent);

router.post("/subscribe", authenticate, subscribe)

export default router;
