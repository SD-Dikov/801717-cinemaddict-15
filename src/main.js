import { getFilms } from './mock/films-mock';
import { render, RenderPosition } from './utils/render.js';
import FooterStat from './view/footer-stat.js';
import MovieList from './presenter/movie-list';

const movies = getFilms();

const body = document.querySelector('body');
const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterElement = document.querySelector('.footer');
const footerStatisticsElement = siteFooterElement.querySelector(
  '.footer__statistics',
);

render(
  footerStatisticsElement,
  new FooterStat(movies.length),
  RenderPosition.BEFOREEND,
);
const presenter = new MovieList(
  body,
  siteMainElement,
  siteHeaderElement,
  siteFooterElement,
);

presenter.init(movies);
