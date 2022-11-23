const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');
const BadRequestError = require('../errors/bad-request-error');

module.exports.getSavedMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description, image, trailerLink, thumbnail, movieId, nameRU, nameEN,
  } = req.body;
  Movie.create({
    country, director, duration, year, description, image, trailerLink, thumbnail, movieId, nameRU, nameEN, owner: req.user._id,
  })
    .then((movie) => {
      res.send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании фильма'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        return next(new NotFoundError('Фильм с указанным ID не найден'));
      }
      if (String(req.user._id) !== String(movie.owner)) {
        return next(new ForbiddenError('Нет доступа'));
      }
      return Movie.findByIdAndRemove(req.params.movieId)
        .then((movieItem) => res.send({ data: movieItem, message: movieDeleteFromSaved }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Этот фмльм не принадлежит данному ID'));
      } else {
        next(err);
      }
    });
};
