import FilmsList from "../view/films-list.js";
import FilmsContainer from "../view/films.js";
import HeaderProfile from "../view/header-profile.js";
import MainNavigation from "../view/main-navigation.js";
import MoreBtn from "../view/more-btn.js";
import SortMenu from "../view/sort-menu.js";
// import Movie from "./movie";
import FilmCard from "../view/film-card.js";
import FilmDetails from "../view/film-details.js";
import MostCommented from "../view/most-commented.js";
import TopRated from "../view/top-rated.js";
import { render, RenderPosition, remove } from "../utils/render.js";

const FILM_STEP_COUNT = 5;

export default class MovieList {
  constructor(bodyContainer, mainContainer, headerContainer, footerContainer) {
    this._mainContainer = mainContainer;
    this._bodyContaner = bodyContainer;
    this._headerContainer = headerContainer;
    this._footerContainer = footerContainer;

    this._filmsListComponent = new FilmsList();
    this._filmsContainerComponent = new FilmsContainer();
    this._moreBtnComponent = new MoreBtn();
    this._sortMenuComponent = new SortMenu();
    this._filmCardComponent = new FilmCard();
    this._filmDetailsComponent = new FilmDetails();
    this._mostCommentedComponent = new MostCommented();
    this._topRatedComponent = new TopRated();
  }

  init(movies) {
    this._movies = movies;
    this._moviesForRender = movies.slice();

    render(
      this._mainContainer,
      this._sortMenuComponent,
      RenderPosition.BEFOREEND
    );

    this._renderMovies();
    this._renderHeaderProfile();
    this._renderMainNavigation();

    render(
      this._mainContainer,
      this._filmsContainerComponent,
      RenderPosition.BEFOREEND
    );
    render(
      this._filmsContainerComponent,
      this._filmsListComponent,
      RenderPosition.BEFOREEND
    );
  }

  _renderHeaderProfile() {
    const headerProfileComponent = new HeaderProfile(this._movies);

    render(
      this._headerContainer,
      headerProfileComponent,
      RenderPosition.BEFOREEND
    );
  }

  _renderMainNavigation() {
    const mainNavigationComponent = new MainNavigation(this._movies);

    render(
      this._mainContainer,
      mainNavigationComponent,
      RenderPosition.BEFOREEND
    );
  }

  _renderMoreBtn() {
    render(
      this._filmsListComponent,
      this._moreBtnComponent,
      RenderPosition.BEFOREEND
    );

    this._moreBtnComponent.setClickHandler(() => {
      this._renderMovies();
      if (this._moviesForRender.length) {
        remove(this._moreBtnComponent);
      }
    });
  }

  // _renderSortMenu() {}

  _renderFilmCard(film) {
    const filmComponent = new FilmCard(film);

    const openFilmDetails = (filmId) => {
      const filmForPopup = this._movies.find(
        (item) => Number(item.id) === Number(filmId)
      );
      this._renderFilmDetails(filmForPopup);
    };

    filmComponent.setFilmCardClickHandler((evt) => {
      openFilmDetails(evt.target.dataset.popup);
    });

    render(
      this._filmsContainerComponent,
      filmComponent,
      RenderPosition.BEFOREEND
    );
  }

  _removeFilmDetails() {
    remove(this.openedFilmDetails);
    this.openedFilmDetails = null;
  }

  _renderFilmDetails() {
    if (this.openedFilmDetails instanceof FilmDetails) {
      this._removeFilmDetails();
    }

    this.openedFilmDetails = this._filmDetailsComponent;

    this.openedFilmDetails.setCloseBtnClickHandler(() => {
      body.classList.remove("hide-overflow");
      this._removeFilmDetails();
    });

    body.classList.add("hide-overflow");
    render(
      this._movieContainer,
      this.openedFilmDetails,
      RenderPosition.BEFOREEND
    );
  }
  // _renderMostCommented() {}
  // _renderTopRated() {}

  _renderMovies() {
    const filmsCount =
      this._moviesForRender.length < FILM_STEP_COUNT
        ? this._moviesForRender.length
        : FILM_STEP_COUNT;
    for (let i = 0; i < filmsCount; i++) {
      this._renderFilmCard(this._moviesForRender[i], this._moviesContainer);
    }
    this._moviesForRender.splice(0, filmsCount);
  }
}
