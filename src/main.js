import { getFilms } from './mock/films-mock.js';
import MovieList from './presenter/movie-list.js';
import FilterPresenter from './presenter/filter.js';
import MoviesModel from './model/movies.js';
import FilterModel from './model/filter.js';

const movies = getFilms();

const moviesModel = new MoviesModel();
const filterModel = new FilterModel();

moviesModel.setMovies(movies);

const body = document.querySelector('body');
const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const footerStatisticsElement = document.querySelector('.footer__statistics');

const moviePresenter = new MovieList(
  body,
  siteMainElement,
  siteHeaderElement,
  footerStatisticsElement,
  moviesModel,
  filterModel,
);

const filterPresenter = new FilterPresenter(
  siteMainElement,
  filterModel,
  moviesModel,
);

filterPresenter.init();
moviePresenter.init();
