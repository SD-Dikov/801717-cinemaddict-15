import { getFilms } from './mock/films-mock';
import { render, RenderPosition, remove } from './utils/render.js';
import FilmCard from './view/film-card.js';
import FilmDetails from './view/film-details.js';
import FilmsList from './view/films-list.js';
import FilmsContainer from './view/films.js';
import FooterStat from './view/footer-stat.js';
import HeaderProfile from './view/header-profile.js';
import MainNavigation from './view/main-navigation.js';
import MoreBtn from './view/more-btn.js';
import MostCommented from './view/most-commented.js';
import SortMenu from './view/sort-menu.js';
import TopRated from './view/top-rated.js';

const FILM_STEP_COUNT = 5;
const EXTRA_FILM_STEP_COUNT = 2;

const movies = getFilms();
const moviesForRender = movies.slice();
const moviesRatingSort = movies
  .slice()
  .sort((prev, next) => next.totalRating - prev.totalRating);
const moviesCommentCountSort = movies
  .slice()
  .sort((prev, next) => next.comments.length - prev.comments.length);

const body = document.querySelector('body');
const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');
const footerStatisticsElement = siteFooterElement.querySelector(
  '.footer__statistics',
);

render(siteHeaderElement, new HeaderProfile(movies), RenderPosition.BEFOREEND);
render(siteMainElement, new MainNavigation(movies), RenderPosition.BEFOREEND);
render(siteMainElement, new SortMenu(), RenderPosition.BEFOREEND);
render(siteMainElement, new FilmsContainer(), RenderPosition.BEFOREEND);
render(
  footerStatisticsElement,
  new FooterStat(movies.length),
  RenderPosition.BEFOREEND,
);

let openedFilmDetails = null;

const renderFilmDetails = (film) => {
  const removeFilmDetails = () => {
    remove(openedFilmDetails);
    openedFilmDetails = null;
  };

  if (openedFilmDetails instanceof FilmDetails) {
    removeFilmDetails();
  }

  openedFilmDetails = new FilmDetails(film);

  openedFilmDetails.setCloseBtnClickHandler(() => {
    body.classList.remove('hide-overflow');
    removeFilmDetails();
  });

  body.classList.add('hide-overflow');
  render(siteMainElement, openedFilmDetails, RenderPosition.BEFOREEND);
};

const mainFilmsElement = siteMainElement.querySelector('.films');

render(mainFilmsElement, new FilmsList(), RenderPosition.BEFOREEND);
render(mainFilmsElement, new TopRated().getElement(), RenderPosition.BEFOREEND);
render(mainFilmsElement, new MostCommented(), RenderPosition.BEFOREEND);

const filmsListElement = mainFilmsElement.querySelector('.films-list');
const moreBtnComponent = new MoreBtn();

render(filmsListElement, moreBtnComponent, RenderPosition.BEFOREEND);

const filmsListContainerElement = mainFilmsElement.querySelector(
  '.films-list__container--main-list',
);

const renderFilmCard = (film, container) => {
  const filmsComponent = new FilmCard(film);

  const openFilmDetails = (filmId) => {
    const filmForPopup = movies.find(
      (item) => Number(item.id) === Number(filmId),
    );
    renderFilmDetails(filmForPopup);
  };

  filmsComponent.setFilmCardClickHandler((evt) => {
    openFilmDetails(evt.target.dataset.popup);
  });

  render(container, filmsComponent, RenderPosition.BEFOREEND);
};

const renderFilms = () => {
  const filmsCount =
    moviesForRender.length < FILM_STEP_COUNT
      ? moviesForRender.length
      : FILM_STEP_COUNT;
  for (let i = 0; i < filmsCount; i++) {
    renderFilmCard(moviesForRender[i], filmsListContainerElement);
  }
  moviesForRender.splice(0, filmsCount);
};

const renderExstraFilms = (movieList, container) => {
  for (let i = 0; i < EXTRA_FILM_STEP_COUNT; i++) {
    renderFilmCard(movieList[i], container);
  }
};

renderFilms();

const topRatedElement = mainFilmsElement.querySelector(
  '.films-list__container--top-rated',
);
const mostCommentedElement = mainFilmsElement.querySelector(
  '.films-list__container--most-commented',
);

renderExstraFilms(moviesRatingSort, topRatedElement);
renderExstraFilms(moviesCommentCountSort, mostCommentedElement);

moreBtnComponent.setClickHandler(() => {
  renderFilms();
  if (!moviesForRender.length) {
    remove(moreBtnComponent);
  }
});
