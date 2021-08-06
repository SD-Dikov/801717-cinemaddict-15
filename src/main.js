import { headerProfile } from "./view/header-profile.js";
import { mainNavigation } from "./view/main-navigation.js";
import { sortMenu } from "./view/sort-menu.js";
import { moreBtn } from "./view/more-btn.js";
import { films } from "./view/films.js";
import { filmsList } from "./view/films-list.js";
import { topRated } from "./view/top-rated.js";
import { mostCommented } from "./view/most-commented.js";
import { filmCard } from "./view/film-card.js";
import { footerStat } from "./view/footer-stat.js";
import { filmDetails } from "./view/film-details.js";
import { generateFilm } from "./mock/film";

const FILM_MOCK_COUNT = 20;

const generateMocks = (count) => {
  const filmsMockList = [];
  for (let i = 0; i < count; i++) {
    filmsMockList.push(generateFilm(i));
  }
  return filmsMockList;
};

const filmsMock = generateMocks(FILM_MOCK_COUNT);

const render = (container, tamplate, place) => {
  container.insertAdjacentHTML(place, tamplate);
};

const FILM_COUNT = 5;
const EXTRA_FILM_COUNT = 2;

const body = document.querySelector("body");
const siteHeaderElement = document.querySelector(".header");
const siteMainElement = document.querySelector(".main");
const siteFooterElement = document.querySelector(".footer");
const footerStatisticsElement = siteFooterElement.querySelector(
  ".footer__statistics"
);

body.classList.add("hide-overflow");

render(siteHeaderElement, headerProfile(), "beforeend");
render(siteMainElement, mainNavigation(), "beforeend");
render(siteMainElement, sortMenu(), "beforeend");
render(siteMainElement, films(), "beforeend");
render(footerStatisticsElement, footerStat(), "beforeend");
render(siteMainElement, filmDetails(filmsMock[0]), "beforeend");

const mainFilmsElement = siteMainElement.querySelector(".films");

render(mainFilmsElement, filmsList(), "beforeend");
render(mainFilmsElement, topRated(), "beforeend");
render(mainFilmsElement, mostCommented(), "beforeend");

const filmsListElement = mainFilmsElement.querySelector(".films-list");
const filmsListContainerElement = mainFilmsElement.querySelector(
  ".films-list__container--main-list"
);

for (let i = 0; i < FILM_COUNT; i++) {
  render(filmsListContainerElement, filmCard(filmsMock[i]), "beforeend");
}
render(filmsListElement, moreBtn(), "beforeend");

const topRatedElement = mainFilmsElement.querySelector(
  ".films-list__container--top-rated"
);

for (let i = 0; i < EXTRA_FILM_COUNT; i++) {
  render(topRatedElement, filmCard(), "beforeend");
}

const mostCommentedElement = mainFilmsElement.querySelector(
  ".films-list__container--most-commented"
);

for (let i = 0; i < EXTRA_FILM_COUNT; i++) {
  render(mostCommentedElement, filmCard(), "beforeend");
}
