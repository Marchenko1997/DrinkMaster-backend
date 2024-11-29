import express from 'express';
import { signUp } from '../../controllers/auth/signUp.js';
import { logOut } from '../../controllers/auth/logOut.js';
import { verifyEmail } from '../../controllers/auth/verifyEmail.js';
import { resendVerifyEmail } from '../../controllers/auth/resendVerifyEmail.js';
import { validateBody} from '../../middlewares/index.js';
import { schemas } from '../../models/users.js';
import { ctrlWrapper } from '../../helpers/index.js';
import { signIn } from '../../controllers/auth/signIn.js';


const router = express.Router();

router.post("/signin", validateBody(schemas.signInSchema), ctrlWrapper(signIn));

router.post("/signout", ctrlWrapper(logOut));

router.post("/signup", validateBody(schemas.signUpSchema), ctrlWrapper(signUp));

router.post("/verify", validateBody(schemas.emailSchema), ctrlWrapper(resendVerifyEmail));

router.get("/verify/:verificationToken", ctrlWrapper(verifyEmail));

export default router;
