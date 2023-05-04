import express from 'express';
import userRoutes from './user.route';
import roleRoutes from './role.route';
import notificationRoutes from './notification.route';

const router = express.Router();
router.use('/users', userRoutes, roleRoutes);
router.use('/notifications', notificationRoutes);

router.use('*', (req, res) => {
  res.status(404).json({
    code: 404,
    message: 'Not Found',
  });
});

export default router;
