import passport from 'passport';
import {
  redisClient,
  notificationTemplates,
  sendEmailReset,
  configEmail,
  asyncWrapper,
} from '../helpers';
import {
  generateToken,
  generateForgetPasswordToken,
  decodeResetPasswordToken,
  decodeToken,
  hashPassword,
  notificationUtils,
} from '../utils';
import { userServices, notificationServices } from '../services';
import twoFactorAuth from '../services/twofactor.service';
import verifyOldPassword from '../helpers/verifyPassword';

const signUp = async (req, res, next) => {
  passport.authenticate('signup', { session: false }, (err, user) => {
    req.login(user, async () => {
      const body = {
        id: req.user.id,
        lastname: req.user.lastname,
        email: req.user.email,
        role: user.role,
        is_verified: user.is_verified,
      };
      const token = generateToken(body);
      redisClient.setEx(req.user.id, 86400, token);

      await notificationUtils.signup(req.user);
      notificationServices.sendNotification(
        req.user.id,
        'Account is created successfully',
        'User registration',
        'low'
      );

      res
        .status(201)
        .header('authenticate', token)
        .json({ code: 201, message: 'Account Created', token });
    });
  })(req, res, next);
};
const login = async (req, res, next) => {
  passport.authenticate(
    'login',
    { session: false },

    async (err, user, info) => {
      try {
        if (err || !user) {
          return res.status(406).json({ code: 406, message: info.message });
        }
        const data = {
          id: user.id,
          lastname: user.lastname,
          email: user.email,
          role: user.role,
        };
        if (user.role === 'ADMIN' && user.tfa_enabled === true) {
          return twoFactorAuth(res, user);
        }
        const token = generateToken(data);
        await redisClient.setEx(user.id, 86400, token);
        req.user = user;
        return res
          .status(200)
          .header('authenticate', token)
          .json({
            Code: 200,
            Message: `Logged In Successfully as ${req.user.lastname} .`,
            token,
          });
      } catch (error) {
        return next(error);
      }
    }
  )(req, res, next);
};
const verifyOTP = asyncWrapper(async (req, res) => {
  const { verificationCode } = req.body;
  const { email } = req.params;
  const result = await redisClient.get(email, (err, data) => data);
  const redisOTP = result.split('=')[0];
  const redisToken = result.split('=')[1];
  if (redisOTP === verificationCode) {
    const user = decodeToken(redisToken);
    await redisClient.setEx(user.id, 86400, redisToken);
    req.user = user;
    res
      .status(200)
      .header('authenticate', redisToken)
      .json({
        code: 200,
        message: `Logged In Successfully as ${req.user.lastname} .`,
        token: redisToken,
      });
  }
});

const logOut = async (req, res) => {
  try {
    await redisClient.del(req.user.id);
    res.status(200).json({ code: 200, message: 'Logged Out' });
  } catch (error) {
    res.status(400).json({ code: 400, error: 'User Not Found' });
  }
};

const getAllUsers = async (req, res) => {
  const users = (await userServices.getAllUsers()) || [];
  res
    .status(200)
    .json({ code: 200, message: 'Users fetched successfully', users });
};

const forgotPassword = asyncWrapper(async (req, res) => {
  const { email } = req.body;
  const user = await userServices.getUserByEmail(email);
  if (!user) {
    return res.status(400).json({
      code: 400,
      message: 'User with email does not exist!',
    });
  }
  const userEmail = { email, id: user.id };
  const token = generateForgetPasswordToken(userEmail);
  const resetPasswordContent =
    notificationTemplates.ForgortPasswordTemplate(token);
  sendEmailReset(
    configEmail({
      email,
      subject: 'E-commerce Reset Password',
      content: resetPasswordContent,
    })
  );
  return res.status(200).json({
    code: 200,
    message: 'Message  sent successfully!',
    token,
  });
});
const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const payload = decodeResetPasswordToken(token);
    req.user = payload;
    const { email } = req.user;
    try {
      await userServices.UpdatePassword(email, req.body.password).then(() =>
        res.status(200).json({
          code: 200,
          message: 'You have reset successful your password',
        })
      );
    } catch (error) {
      return res.status(500).json({
        code: 500,
        message: 'Server error',
      });
    }
  } catch (error) {
    return res.status(401).json({
      code: 401,
      message: 'Invalid Token, please try again',
    });
  }
};
const changePassword = async (req, res, next) => {
  try {
    const user = await userServices.getUserById(req.user.id);
    // Verify that the old password matches
    const passwordMatches = await verifyOldPassword(
      user.dataValues.id,
      req.body.oldPassword
    );
    if (!passwordMatches) {
      return res.status(401).json({
        code: 401,
        message: 'Incorrect password',
      });
    }

    // Hash the new password and update the user in the database
    const { newPassword } = req.body;
    const hashedPassword = await hashPassword(newPassword);
    user.password = hashedPassword;

    // Save the updated user object
    await user.save();

    await notificationUtils.changePassword(req.user);
    notificationServices.sendNotification(
      req.user.id,
      'Password is changed successfully',
      'Password update',
      'low'
    );

    return res.status(200).json({
      code: 200,
      message: 'Password updated successfully',
      user,
    });
  } catch (error) {
    return next(error);
  }
};

// Account verification controller
const verifyAccount = async (req, res) => {
  const { userId } = req.params;

  try {
    // Verify that the user exists
    const user = await userServices.getUserById(userId);
    if (!user) {
      return res.status(404).json({
        code: 404,
        message: 'User not found',
      });
    }

    // Verify the user's account
    user.is_verified = true;
    await user.save();

    return res.status(200).json({
      code: 200,
      message: 'Account verified successfully',
      user,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      code: 500,
      message: 'Internal server error',
    });
  }
};

export default {
  getAllUsers,
  signUp,
  login,
  forgotPassword,
  resetPassword,
  logOut,
  changePassword,
  verifyOTP,
  verifyAccount,
};
