import { getFilms } from "./mock/films-mock.js";
// import { render, RenderPosition } from "./utils/render.js";
import MovieList from "./presenter/movie-list.js";
import FilterPresenter from "./presenter/filter.js";
import MoviesModel from "./model/movies.js";
import FilterModel from "./model/filter.js";
import CommentsModel from "./model/comments.js";

const movies = getFilms();

const moviesModel = new MoviesModel();
const filterModel = new FilterModel();
const commentsModel = new CommentsModel();

moviesModel.setMovies(movies);

const body = document.querySelector("body");
const siteMainElement = document.querySelector(".main");
const siteHeaderElement = document.querySelector(".header");
const footerStatisticsElement = document.querySelector(".footer__statistics");

const moviePresenter = new MovieList(
  body,
  siteMainElement,
  siteHeaderElement,
  footerStatisticsElement,
  moviesModel,
  filterModel,
  commentsModel
);

const filterPresenter = new FilterPresenter(
  siteMainElement,
  filterModel,
  moviesModel
);

filterPresenter.init();
moviePresenter.init();
