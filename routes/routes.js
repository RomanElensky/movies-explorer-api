const router = require('express').Router();

const auth = require('../middlewares/auth');
const userRouter = require('./users');
const movieRouter = require('./movies');

const { createUser, loginUser } = require('../controllers/users');
const { createUserValidation, loginUserValidation } = require('../middlewares/validations');

const NotFoundError = require('../errors/not-found-error');

router.post('/signin', loginUserValidation, loginUser);
router.post('/signup', createUserValidation, createUser);
router.use('/users', auth, userRouter);
router.use('/movies', auth, movieRouter);

router.all('*', auth, (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
