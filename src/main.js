import { headerProfile } from './view/header-profile.js';
import { mainNavigation } from './view/main-navigation.js';
import { sortMenu } from './view/sort-menu.js';
import { moreBtn } from './view/more-btn.js';
import { films } from './view/films.js';
import { filmsList } from './view/films-list.js';
import { topRated } from './view/top-rated.js';
import { mostCommented } from './view/most-commented.js';
import { filmCard } from './view/film-card.js';
import { footerStat } from './view/footer-stat.js';
import { filmDetails } from './view/film-details.js';
import { getFilms } from './mock/films-mock';

const FILM_STEP_COUNT = 5;
const EXTRA_FILM_STEP_COUNT = 2;

const movies = getFilms();
const moviesForRender = movies;

const render = (container, tamplate, place) => {
  container.insertAdjacentHTML(place, tamplate);
};

const body = document.querySelector('body');
const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');
const footerStatisticsElement = siteFooterElement.querySelector(
  '.footer__statistics',
);

render(siteHeaderElement, headerProfile(movies), 'beforeend');
render(siteMainElement, mainNavigation(movies), 'beforeend');
render(siteMainElement, sortMenu(), 'beforeend');
render(siteMainElement, films(), 'beforeend');
render(footerStatisticsElement, footerStat(movies.length), 'beforeend');
render(siteMainElement, filmDetails(movies[0]), 'beforeend');
body.classList.add('hide-overflow');

const mainFilmsElement = siteMainElement.querySelector('.films');

render(mainFilmsElement, filmsList(), 'beforeend');
render(mainFilmsElement, topRated(), 'beforeend');
render(mainFilmsElement, mostCommented(), 'beforeend');

const filmsListElement = mainFilmsElement.querySelector('.films-list');

render(filmsListElement, moreBtn(), 'beforeend');

const showMoreBtn = filmsListElement.querySelector('.films-list__show-more');
const filmsListContainerElement = mainFilmsElement.querySelector(
  '.films-list__container--main-list',
);

const renderFilms = () => {
  const filmsCount =
    moviesForRender.length < FILM_STEP_COUNT
      ? moviesForRender.length
      : FILM_STEP_COUNT;
  for (let i = 0; i < filmsCount; i++) {
    render(
      filmsListContainerElement,
      filmCard(moviesForRender[i]),
      'beforeend',
    );
  }
  moviesForRender.splice(0, filmsCount);
};

renderFilms();

const topRatedElement = mainFilmsElement.querySelector(
  '.films-list__container--top-rated',
);

for (let i = 0; i < EXTRA_FILM_STEP_COUNT; i++) {
  render(topRatedElement, filmCard(movies[i]), 'beforeend');
}

const mostCommentedElement = mainFilmsElement.querySelector(
  '.films-list__container--most-commented',
);

for (let i = 0; i < EXTRA_FILM_STEP_COUNT; i++) {
  render(mostCommentedElement, filmCard(movies[i]), 'beforeend');
}

showMoreBtn.addEventListener('click', () => {
  renderFilms();
  if (!moviesForRender.length) {
    showMoreBtn.remove();
  }
});
