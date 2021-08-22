import FilmsContainer from "../view/films.js";
import FilmsList from "../view/films-list.js";
import FilmsListContainer from "../view/films-list-container.js";
import HeaderProfile from "../view/header-profile.js";
import MainNavigation from "../view/main-navigation.js";
import MoreBtn from "../view/more-btn.js";
import SortMenu from "../view/sort-menu.js";
import MoviePresenter from "./movie";
import FilmCard from "../view/film-card.js";
import FilmDetails from "../view/film-details.js";
import MostCommented from "../view/most-commented.js";
import TopRated from "../view/top-rated.js";
import TopRatedContainer from "../view/top-rated-container.js";
import MostCommentedContainer from "../view/most-commented-container.js";
import { render, RenderPosition, remove } from "../utils/render.js";

const FILM_STEP_COUNT = 5;
const EXTRA_FILM_STEP_COUNT = 2;

export default class MovieList {
  constructor(bodyContainer, mainContainer, headerContainer, footerContainer) {
    this._mainContainer = mainContainer;
    this._bodyContainer = bodyContainer;
    this._headerContainer = headerContainer;
    this._footerContainer = footerContainer;

    this._filmsListComponent = new FilmsList();
    this._filmsContainerComponent = new FilmsContainer();
    this._filmsListContainerComponent = new FilmsListContainer();
    this._moreBtnComponent = new MoreBtn();
    this._sortMenuComponent = new SortMenu();
    // this._filmCardComponent = new FilmCard();
    // this._filmDetailsComponent = new FilmDetails();
    this._mostCommentedComponent = new MostCommented();
    this._topRatedComponent = new TopRated();
    this._MostCommentedContainerComponent = new MostCommentedContainer();
    this._TopRatedContainerComponent = new TopRatedContainer();
  }

  init(movies) {
    this._movies = movies;
    this._moviesForRender = movies.slice();
    this._moviesRatingSort = movies
      .slice()
      .sort((prev, next) => next.totalRating - prev.totalRating);
    this._moviesCommentCountSort = movies
      .slice()
      .sort((prev, next) => next.comments.length - prev.comments.length);

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
    render(
      this._filmsListComponent,
      this._filmsListContainerComponent,
      RenderPosition.BEFOREEND
    );
    render(
      this._filmsContainerComponent,
      this._topRatedComponent,
      RenderPosition.BEFOREEND
    );
    render(
      this._filmsContainerComponent,
      this._mostCommentedComponent,
      RenderPosition.BEFOREEND
    );
    render(
      this._topRatedComponent,
      this._TopRatedContainerComponent,
      RenderPosition.BEFOREEND
    );
    render(
      this._mostCommentedComponent,
      this._MostCommentedContainerComponent,
      RenderPosition.BEFOREEND
    );

    this._renderExstraFilms(
      this._moviesRatingSort,
      this._TopRatedContainerComponent
    );
    this._renderExstraFilms(
      this._moviesCommentCountSort,
      this._MostCommentedContainerComponent
    );
    this._renderMoreBtn();
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
      if (!this._moviesForRender.length) {
        remove(this._moreBtnComponent);
      }
    });
  }

  // _renderSortMenu() {}

  _renderFilmCard(film, container) {
    // const filmComponent = new FilmCard(film);

    // const openFilmDetails = (filmId) => {
    //   const filmForPopup = this._movies.find(
    //     (item) => Number(item.id) === Number(filmId)
    //   );
    //   this._renderFilmDetails(filmForPopup);
    // };

    // filmComponent.setFilmCardClickHandler((evt) => {
    //   openFilmDetails(evt.target.dataset.popup);
    // });

    // render(container, filmComponent, RenderPosition.BEFOREEND);

    const moviePresenter = new MoviePresenter(
      container,
      this._movies,
      this._bodyContainer
    );

    moviePresenter.init(film);
  }

  // _removeFilmDetails() {
  //   remove(this._openedFilmDetails);
  //   this._openedFilmDetails = null;
  // }

  // _renderFilmDetails(film) {
  //   if (this._openedFilmDetails instanceof FilmDetails) {
  //     this._removeFilmDetails();
  //   }

  //   this._openedFilmDetails = new FilmDetails(film);

  //   this._openedFilmDetails.setCloseBtnClickHandler(() => {
  //     this._bodyContainer.classList.remove("hide-overflow");
  //     this._removeFilmDetails();
  //   });

  //   this._bodyContainer.classList.add("hide-overflow");
  //   render(
  //     this._bodyContainer,
  //     this._openedFilmDetails,
  //     RenderPosition.BEFOREEND
  //   );
  // }

  _renderExstraFilms(movieList, container) {
    for (let i = 0; i < EXTRA_FILM_STEP_COUNT; i++) {
      this._renderFilmCard(movieList[i], container);
    }
  }

  _renderMovies() {
    const filmsCount =
      this._moviesForRender.length < FILM_STEP_COUNT
        ? this._moviesForRender.length
        : FILM_STEP_COUNT;
    for (let i = 0; i < filmsCount; i++) {
      this._renderFilmCard(
        this._moviesForRender[i],
        this._filmsListContainerComponent
      );
    }
    this._moviesForRender.splice(0, filmsCount);
  }
}
