const movieRouter = require('express').Router();

const { createMovieValidation, deleteMovieValidation } = require('../middlewares/validations');

const {
  getSavedMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

movieRouter.get('/', getSavedMovies);
movieRouter.post('/', createMovieValidation, createMovie);
movieRouter.delete('/:movieId', deleteMovieValidation, deleteMovie);

module.exports = movieRouter;
