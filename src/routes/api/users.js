import express from 'express';
import { ctrlWrapper } from '../../helpers/index.js';
import { getCurrent } from '../../controllers/auth/getCurrent.js';
import { authenticate, upload } from '../../middlewares/index.js';
import { updateUser } from '../../controllers/auth/updateUser.js';
import { validateBody } from '../../middlewares/index.js';
import { schemas } from '../../models/users.js';

const router = express.Router();

router.patch(
  '/update',
  authenticate,
  upload.single('avatarURL'),
  validateBody(schemas.updateNameSchema),
  ctrlWrapper(updateUser),
);

router.get('/current', authenticate, ctrlWrapper(getCurrent));

export default router;
