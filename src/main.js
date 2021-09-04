import { getFilms } from "./mock/films-mock.js";
import { render, RenderPosition } from "./utils/render.js";
import FooterStat from "./view/footer-stat.js";
import MovieList from "./presenter/movie-list.js";
import MoviesModel from "./model/movies.js";

const movies = getFilms();

const moviesModel = new MoviesModel();
moviesModel.setMovies(movies);

const body = document.querySelector("body");
const siteMainElement = document.querySelector(".main");
const siteHeaderElement = document.querySelector(".header");
const siteFooterElement = document.querySelector(".footer");
const footerStatisticsElement = siteFooterElement.querySelector(
  ".footer__statistics"
);

render(
  footerStatisticsElement,
  new FooterStat(movies.length),
  RenderPosition.BEFOREEND
);
const moviePresenter = new MovieList(
  body,
  siteMainElement,
  siteHeaderElement,
  siteFooterElement,
  moviesModel
);

moviePresenter.init(movies);
