import MovieList from "./presenter/movie-list.js";
import FilterPresenter from "./presenter/filter.js";
import MoviesModel from "./model/movies.js";
import FilterModel from "./model/filter.js";
import StatisticView from "./view/statistic.js";
import FooterStat from "./view/footer-stat.js";
import Api from "./api/api.js";
import { MenuItem, UpdateType } from "./const.js";
import { render, RenderPosition, remove } from "./utils/render.js";

const AUTHORIZATION = "Basic 801717cinemaDD15";
const END_POINT = "https://15.ecmascript.pages.academy/cinemaddict/";

const api = new Api(END_POINT, AUTHORIZATION);

const moviesModel = new MoviesModel();
const filterModel = new FilterModel();

const bodyElement = document.querySelector("body");
const siteMainElement = bodyElement.querySelector(".main");
const siteHeaderElement = bodyElement.querySelector(".header");
const footerStatisticsElement = bodyElement.querySelector(
  ".footer__statistics"
);

let statisticsComponent = null;
let currentMenuItem = MenuItem.MOVIES;

const moviePresenter = new MovieList(
  bodyElement,
  siteMainElement,
  siteHeaderElement,
  moviesModel,
  filterModel,
  api
);

const handleSiteMenuClick = (menuItem) => {
  if (currentMenuItem === menuItem) {
    return;
  }
  switch (menuItem) {
    case MenuItem.MOVIES:
      moviePresenter.init();
      remove(statisticsComponent);
      currentMenuItem = MenuItem.MOVIES;
      getMainNavigationAdditional().classList.remove(
        "main-navigation__additional--active"
      );
      break;
    case MenuItem.STATISTICS:
      moviePresenter.destroy();
      statisticsComponent = new StatisticView(moviesModel.getMovies());
      render(siteMainElement, statisticsComponent, RenderPosition.BEFOREEND);
      currentMenuItem = MenuItem.STATISTICS;
      getMainNavigationAdditional().classList.add(
        "main-navigation__additional--active"
      );
      break;
  }
};

const getMainNavigationAdditional = () =>
  bodyElement.querySelector(".main-navigation__additional");

const filterPresenter = new FilterPresenter(
  siteMainElement,
  filterModel,
  moviesModel,
  handleSiteMenuClick
);

filterPresenter.init();
moviePresenter.init();

api
  .getMovies()
  .then((movies) => {
    moviesModel.setMovies(UpdateType.INIT, movies);
    render(
      footerStatisticsElement,
      new FooterStat(moviesModel.getMovies().length),
      RenderPosition.BEFOREEND
    );
  })
  .catch(() => {
    moviesModel.setMovies(UpdateType.INIT, []);
  });

window.addEventListener("load", () => {
  navigator.serviceWorker.register("/sw.js");
});
