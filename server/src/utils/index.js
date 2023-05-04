import errorMessage from './errormessage';
import generateOtp from './generateOtp';
import sendEmails from './sendEmails';
import { hashPassword, comparePassword } from './password';
import {
  generateToken,
  decodeToken,
  generateForgetPasswordToken,
  decodeResetPasswordToken,
} from './token';
import {
  LoginSchema,
  SignUpSchema,
  PasswordSchema,
  newPasswordSchema,
} from './validationSchemas/authenticationSchemas';
import userProfileSchema from './validationSchemas/userProfileSchema';
import uuidSchemas from './validationSchemas/uuidSchemas';
import notificationUtils from './notificationUtils';

export {
  errorMessage,
  hashPassword,
  comparePassword,
  generateToken,
  decodeToken,
  generateForgetPasswordToken,
  decodeResetPasswordToken,
  generateOtp,
  sendEmails,
  LoginSchema,
  SignUpSchema,
  PasswordSchema,
  newPasswordSchema,
  userProfileSchema,
  uuidSchemas,
  notificationUtils,
};
