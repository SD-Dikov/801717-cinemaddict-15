import { headerProfile } from "./view/header-profile.js";
import MainNavigation from "./view/main-navigation.js";
import { sortMenu } from "./view/sort-menu.js";
import MoreBtn from "./view/more-btn.js";
import { films } from "./view/films.js";
import { filmsList } from "./view/films-list.js";
import { topRated } from "./view/top-rated.js";
import { mostCommented } from "./view/most-commented.js";
import FilmCard from "./view/film-card.js";
import { footerStat } from "./view/footer-stat.js";
import { filmDetails } from "./view/film-details.js";
import { getFilms } from "./mock/films-mock";
import { RenderPosition, renderElement, renderTemplate } from "./utils.js";

const FILM_STEP_COUNT = 5;
const EXTRA_FILM_STEP_COUNT = 2;

const movies = getFilms();
const moviesForRender = movies;

const body = document.querySelector("body");
const siteHeaderElement = document.querySelector(".header");
const siteMainElement = document.querySelector(".main");
const siteFooterElement = document.querySelector(".footer");
const footerStatisticsElement = siteFooterElement.querySelector(
  ".footer__statistics"
);

renderTemplate(
  siteHeaderElement,
  headerProfile(movies),
  RenderPosition.BEFOREEND
);
renderElement(
  siteMainElement,
  new MainNavigation(movies).getElement(),
  RenderPosition.BEFOREEND
);
renderTemplate(siteMainElement, sortMenu(), RenderPosition.BEFOREEND);
renderTemplate(siteMainElement, films(), RenderPosition.BEFOREEND);
renderTemplate(
  footerStatisticsElement,
  footerStat(movies.length),
  RenderPosition.BEFOREEND
);
renderTemplate(
  siteMainElement,
  filmDetails(movies[0]),
  RenderPosition.BEFOREEND
);
body.classList.add("hide-overflow");

const mainFilmsElement = siteMainElement.querySelector(".films");

renderTemplate(mainFilmsElement, filmsList(), RenderPosition.BEFOREEND);
renderTemplate(mainFilmsElement, topRated(), RenderPosition.BEFOREEND);
renderTemplate(mainFilmsElement, mostCommented(), RenderPosition.BEFOREEND);

const filmsListElement = mainFilmsElement.querySelector(".films-list");

renderElement(
  filmsListElement,
  new MoreBtn().getElement(),
  RenderPosition.BEFOREEND
);

const showMoreBtn = filmsListElement.querySelector(".films-list__show-more");
const filmsListContainerElement = mainFilmsElement.querySelector(
  ".films-list__container--main-list"
);

const renderFilms = () => {
  const filmsCount =
    moviesForRender.length < FILM_STEP_COUNT
      ? moviesForRender.length
      : FILM_STEP_COUNT;
  for (let i = 0; i < filmsCount; i++) {
    renderElement(
      filmsListContainerElement,
      new FilmCard(moviesForRender[i]).getElement(),
      RenderPosition.BEFOREEND
    );
  }
  moviesForRender.splice(0, filmsCount);
};

renderFilms();

const topRatedElement = mainFilmsElement.querySelector(
  ".films-list__container--top-rated"
);

for (let i = 0; i < EXTRA_FILM_STEP_COUNT; i++) {
  renderElement(
    topRatedElement,
    new FilmCard(moviesForRender[i]).getElement(),
    RenderPosition.BEFOREEND
  );
}

const mostCommentedElement = mainFilmsElement.querySelector(
  ".films-list__container--most-commented"
);

for (let i = 0; i < EXTRA_FILM_STEP_COUNT; i++) {
  renderElement(
    mostCommentedElement,
    new FilmCard(moviesForRender[i]).getElement(),
    RenderPosition.BEFOREEND
  );
}

showMoreBtn.addEventListener("click", () => {
  renderFilms();
  if (!moviesForRender.length) {
    showMoreBtn.remove();
  }
});
