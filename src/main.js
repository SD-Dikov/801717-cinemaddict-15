import { getFilms } from './mock/films-mock';
import { render, RenderPosition } from './utils.js';
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

const body = document.querySelector('body');
const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');
const footerStatisticsElement = siteFooterElement.querySelector(
  '.footer__statistics',
);

render(
  siteHeaderElement,
  new HeaderProfile(movies).getElement(),
  RenderPosition.BEFOREEND,
);
render(
  siteMainElement,
  new MainNavigation(movies).getElement(),
  RenderPosition.BEFOREEND,
);
render(siteMainElement, new SortMenu().getElement(), RenderPosition.BEFOREEND);
render(
  siteMainElement,
  new FilmsContainer().getElement(),
  RenderPosition.BEFOREEND,
);
render(
  footerStatisticsElement,
  new FooterStat(movies.length).getElement(),
  RenderPosition.BEFOREEND,
);

const renderFilmDetails = (film) => {
  const filmDetailsComponent = new FilmDetails(film);

  const removeFilmDetails = () => {
    siteMainElement.removeChild(filmDetailsComponent.getElement());
  };

  filmDetailsComponent
    .getElement()
    .querySelector('.film-details__close-btn')
    .addEventListener('click', () => {
      body.classList.remove('hide-overflow');
      removeFilmDetails();
    });

  render(
    siteMainElement,
    filmDetailsComponent.getElement(),
    RenderPosition.BEFOREEND,
  );

  body.classList.add('hide-overflow');
};

const mainFilmsElement = siteMainElement.querySelector('.films');

render(
  mainFilmsElement,
  new FilmsList().getElement(),
  RenderPosition.BEFOREEND,
);
render(mainFilmsElement, new TopRated().getElement(), RenderPosition.BEFOREEND);
render(
  mainFilmsElement,
  new MostCommented().getElement(),
  RenderPosition.BEFOREEND,
);

const filmsListElement = mainFilmsElement.querySelector('.films-list');

render(filmsListElement, new MoreBtn().getElement(), RenderPosition.BEFOREEND);

const showMoreBtn = filmsListElement.querySelector('.films-list__show-more');
const filmsListContainerElement = mainFilmsElement.querySelector(
  '.films-list__container--main-list',
);

const renderFilmCard = (film) => {
  const filmsComponent = new FilmCard(film);
  const linkElementsList = [
    '.film-card__title',
    '.film-card__poster',
    '.film-card__comments',
  ];

  const openFilmDetails = (filmId) => {
    const filmForPopup = movies.filter((item) => {
      if (Number(item.id) === Number(filmId)) {
        return item;
      }
    });
    renderFilmDetails(filmForPopup[0]);
  };

  linkElementsList.forEach((item) => {
    const element = filmsComponent.getElement().querySelector(item);
    element.style.cursor = 'pointer';
    element.addEventListener('click', (evt) => {
      openFilmDetails(evt.target.dataset.popup);
    });
  });

  render(
    filmsListContainerElement,
    filmsComponent.getElement(),
    RenderPosition.BEFOREEND,
  );
};

const renderFilms = () => {
  const filmsCount =
    moviesForRender.length < FILM_STEP_COUNT
      ? moviesForRender.length
      : FILM_STEP_COUNT;
  for (let i = 0; i < filmsCount; i++) {
    renderFilmCard(moviesForRender[i]);
  }
  moviesForRender.splice(0, filmsCount);
};

renderFilms();

const topRatedElement = mainFilmsElement.querySelector(
  '.films-list__container--top-rated',
);

for (let i = 0; i < EXTRA_FILM_STEP_COUNT; i++) {
  render(
    topRatedElement,
    new FilmCard(moviesForRender[i]).getElement(),
    RenderPosition.BEFOREEND,
  );
}

const mostCommentedElement = mainFilmsElement.querySelector(
  '.films-list__container--most-commented',
);

for (let i = 0; i < EXTRA_FILM_STEP_COUNT; i++) {
  render(
    mostCommentedElement,
    new FilmCard(moviesForRender[i]).getElement(),
    RenderPosition.BEFOREEND,
  );
}

showMoreBtn.addEventListener('click', () => {
  renderFilms();
  if (!moviesForRender.length) {
    showMoreBtn.remove();
  }
});
