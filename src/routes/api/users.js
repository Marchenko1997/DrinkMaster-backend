import express from 'express';
import { ctrlWrapper } from '../../helpers/index.js';
import { getCurrent } from '../../controllers/auth/getCurrent.js';
import { authenticate } from '../../middlewares/index.js';



const router = express.Router();

router.get("/current", authenticate, ctrlWrapper(getCurrent));

export default router;
