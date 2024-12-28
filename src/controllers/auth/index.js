import { signUp } from './signUp.js';
import { signIn } from './signIn.js';
import { verifyEmail } from './verifyEmail.js';
import { resendVerifyEmail } from './resendVerifyEmail.js';
import { logOut } from './logOut.js';
import { getCurrent } from './getCurrent.js';
import { updateUser } from './updateUser.js';
import { subscribe } from './subscribe.js';


import { ctrlWrapper } from '../../helpers/index.js';

export const authControllers = {
  signUp: ctrlWrapper(signUp),
  signIn: ctrlWrapper(signIn),
  verifyEmail: ctrlWrapper(verifyEmail),
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
  logout: ctrlWrapper(logOut),
  getCurrent: ctrlWrapper(getCurrent),
  updateUser: ctrlWrapper(updateUser),
  subscribe: ctrlWrapper(subscribe),
};
