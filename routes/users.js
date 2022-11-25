const userRouter = require('express').Router();

const { validateUpdateUser } = require('../middlewares/validations');

const {
  getUsers,
  updateUserProfile,
} = require('../controllers/users');

userRouter.get('/me', getUsers);
userRouter.patch('/me', validateUpdateUser, updateUserProfile);

module.exports = userRouter;
