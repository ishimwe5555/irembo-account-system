import { Router } from 'express';
import '../middleware/passport';
import {
  userControllers,
  tfaEnableDisable,
  userProfileController,
  fetchUserController,
} from '../controllers';
import checkUser from '../middleware/checkUser';
import {
  LoginSchema,
  SignUpSchema,
  PasswordSchema,
  newPasswordSchema,
  userProfileSchema,
} from '../utils';
import {
  isAuthenticated,
  userEmailExists,
  validate,
  checkPermission,
} from '../middleware';
import { asyncWrapper, Upload } from '../helpers';

const router = Router();
router.get(
  '/',
  isAuthenticated,
  checkPermission('ADMIN'),
  asyncWrapper(userControllers.getAllUsers)
);
router.post(
  '/signup',
  validate(SignUpSchema),
  userEmailExists,
  asyncWrapper(userControllers.signUp)
);
router.post('/login', validate(LoginSchema), userControllers.login);
router.post('/logout', isAuthenticated, userControllers.logOut);
router.post('/verify/:email', userControllers.verifyOTP);

router.patch(
  '/tfa-enable-disable',
  isAuthenticated,
  checkPermission('ADMIN'),
  asyncWrapper(tfaEnableDisable)
);

router.put(
  '/verify-account/:userId',
  isAuthenticated,
  checkPermission('ADMIN'),
  asyncWrapper(userControllers.verifyAccount)
);

router.put(
  '/profile',
  isAuthenticated,
  validate(userProfileSchema),
  Upload,
  asyncWrapper(userProfileController)
);
router.get('/profile', isAuthenticated, asyncWrapper(fetchUserController));

router.post(
  '/forgotPassword',
  checkUser,
  asyncWrapper(userControllers.forgotPassword)
);
router.put(
  '/reset-password/:token',
  validate(PasswordSchema),
  asyncWrapper(userControllers.resetPassword)
);

router.patch(
  '/change-password',
  isAuthenticated,
  validate(newPasswordSchema),
  asyncWrapper(userControllers.changePassword)
);

export default router;
