import MovieList from './presenter/movie-list.js';
import FilterPresenter from './presenter/filter.js';
import MoviesModel from './model/movies.js';
import FilterModel from './model/filter.js';
import Api from './api.js';
import { UpdateType } from './const.js';

const AUTHORIZATION = 'Basic 801717cinemaDD15';
const END_POINT = 'https://15.ecmascript.pages.academy/cinemaddict/';

const api = new Api(END_POINT, AUTHORIZATION);

const moviesModel = new MoviesModel();
const filterModel = new FilterModel();

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
  api,
);

const filterPresenter = new FilterPresenter(
  siteMainElement,
  filterModel,
  moviesModel,
);

filterPresenter.init();

moviePresenter.init();

api
  .getMovies()
  .then((movies) => {
    moviesModel.setMovies(UpdateType.INIT, movies);
  })
  .catch(() => {
    moviesModel.setMovies(UpdateType.INIT, []);
  });
