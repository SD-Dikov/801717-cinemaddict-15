import FilmsContainer from "../view/films.js";
import FilmsList from "../view/films-list.js";
import FilmsListContainer from "../view/films-list-container.js";
import HeaderProfile from "../view/header-profile.js";
import MoreBtn from "../view/more-btn.js";
import SortMenu from "../view/sort-menu.js";
import MoviePresenter from "./movie";
import MostCommented from "../view/most-commented.js";
import TopRated from "../view/top-rated.js";
import TopRatedContainer from "../view/top-rated-container.js";
import MostCommentedContainer from "../view/most-commented-container.js";
import FooterStat from "../view/footer-stat.js";
import NoFilmsView from "../view/no-films.js";
import { filter } from "../utils/filter.js";
import { render, RenderPosition, remove } from "../utils/render.js";
import { UpdateType, UserAction, FilterType } from "../const.js";

const FILM_STEP_COUNT = 5;
const EXTRA_FILM_STEP_COUNT = 2;

export default class MovieList {
  constructor(
    bodyContainer,
    mainContainer,
    headerContainer,
    footerStatisticsContainer,
    moviesModel,
    filterModel,
    commentsModel
  ) {
    this._moviesModel = moviesModel;
    this._filterModel = filterModel;
    this._commentsModel = commentsModel;
    this._mainContainer = mainContainer;
    this._bodyContainer = bodyContainer;
    this._headerContainer = headerContainer;
    this._footerContainer = footerStatisticsContainer;

    this._filmsListComponent = new FilmsList();
    this._filmsContainerComponent = new FilmsContainer();
    this._filmsListContainerComponent = new FilmsListContainer();
    this._sortMenuComponent = new SortMenu();
    this._mostCommentedComponent = new MostCommented();
    this._topRatedComponent = new TopRated();
    this._MostCommentedContainerComponent = new MostCommentedContainer();
    this._TopRatedContainerComponent = new TopRatedContainer();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._removePopup = this._removePopup.bind(this);
    this._handleMoreBtnClick = this._handleMoreBtnClick.bind(this);

    this._moviesModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._renderedMoviesCount = FILM_STEP_COUNT;
    this._moviePresenter = new Map();
    this._mostCommentedPresenter = new Map();
    this._topRatedPresenter = new Map();
    this._filterType = FilterType.ALL;

    render(
      this._mainContainer,
      this._sortMenuComponent,
      RenderPosition.BEFOREEND
    );
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

    this._renderMoviesList();
  }

  destroy() {
    remove(this._filmsListComponent);
    remove(this._MostCommentedContainerComponent);
    remove(this._TopRatedContainerComponent);

    this._moviesModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }

  _getMovies() {
    this._filterType = this._filterModel.getFilter();
    const movies = this._moviesModel.getMovies();
    const filtredMovie = filter[this._filterType](movies);

    return filtredMovie;
  }

  _getAllMovies() {
    return this._moviesModel.getMovies();
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_MOVIE:
        this._moviesModel.updateMovie(updateType, update);
        break;
      case UserAction.ADD_MOVIE:
        this._moviesModel.addMovie(updateType, update);
        break;
      case UserAction.DELETE_MOVIE:
        this._moviesModel.deleteMovie(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._moviePresenter.get(data.id).init(data);
        if (this._topRatedPresenter.has(data.id)) {
          this._topRatedPresenter.get(data.id).init(data);
        }
        if (this._mostCommentedPresenter.has(data.id)) {
          this._mostCommentedPresenter.get(data.id).init(data);
        }
        break;
      case UpdateType.MINOR:
        this._clearMovies();
        this._renderMoviesList();
        break;
      case UpdateType.MAJOR:
        this._clearMovies({ resetRenderedMoviesCount: true });
        this._renderMoviesList();
        break;
    }
  }

  _removePopup() {
    const filmDetailsPopup = this._bodyContainer.querySelector(".film-details");

    if (filmDetailsPopup) {
      filmDetailsPopup.remove();
    }
  }

  _renderHeaderProfile(films) {
    if (!this._headerProfileComponent === null) {
      this._headerProfileComponent = null;
    }
    this._headerProfileComponent = new HeaderProfile(films);

    render(
      this._headerContainer,
      this._headerProfileComponent,
      RenderPosition.BEFOREEND
    );
  }

  _handleMoreBtnClick() {
    const moviesCount = this._getMovies().length;
    const newRenderedTaskCount = Math.min(
      moviesCount,
      this._renderedMoviesCount + FILM_STEP_COUNT
    );
    const movies = this._getMovies().slice(
      this._renderedMoviesCount,
      newRenderedTaskCount
    );

    this._renderMovies(movies);
    this._renderedMoviesCount = newRenderedTaskCount;

    if (this._renderedMoviesCount >= moviesCount) {
      remove(this._moreBtnComponent);
    }
  }

  _renderMoreBtn() {
    if (!this._moreBtnComponent === null) {
      this._moreBtnComponent === null;
    }

    this._moreBtnComponent = new MoreBtn();
    this._moreBtnComponent.setClickHandler(this._handleMoreBtnClick);

    render(
      this._filmsListComponent,
      this._moreBtnComponent,
      RenderPosition.BEFOREEND
    );
  }

  _renderFooterStatistics(movies) {
    this._footerStatisticsComponent = new FooterStat(movies.length);
    render(
      this._footerContainer,
      this._footerStatisticsComponent,
      RenderPosition.BEFOREEND
    );
  }

  _renderFilmCard(film, container) {
    const moviePresenter = new MoviePresenter(
      container,
      this._movies,
      this._bodyContainer,
      this._handleViewAction,
      this._commentsModel,
      this._removePopup
    );

    moviePresenter.init(film);

    if (
      this._moviesRatingSort.slice(0, EXTRA_FILM_STEP_COUNT).includes(film) &&
      !this._topRatedPresenter.has(film.id)
    ) {
      this._topRatedPresenter.set(film.id, moviePresenter);
    } else if (
      this._moviesCommentCountSort
        .slice(0, EXTRA_FILM_STEP_COUNT)
        .includes(film) &&
      !this._mostCommentedPresenter.has(film.id)
    ) {
      this._mostCommentedPresenter.set(film.id, moviePresenter);
    }

    this._moviePresenter.set(film.id, moviePresenter);
  }

  _renderExstraFilms(movieList, container) {
    for (let i = 0; i < EXTRA_FILM_STEP_COUNT; i++) {
      this._renderFilmCard(movieList[i], container);
    }
  }

  _renderMovies(films) {
    films.forEach((film) => {
      this._renderFilmCard(film, this._filmsListContainerComponent);
    });
  }

  _renderTopRated() {
    this._renderExstraFilms(
      this._moviesRatingSort,
      this._TopRatedContainerComponent
    );
  }

  _renderMostCommented() {
    this._renderExstraFilms(
      this._moviesCommentCountSort,
      this._MostCommentedContainerComponent
    );
  }

  _renderNoMovies() {
    this._noMoviesComponent = new NoFilmsView(this._filterType);
    render(
      this._filmsListComponent,
      this._noMoviesComponent,
      RenderPosition.AFTERBEGIN
    );
  }

  _renderMoviesList() {
    const allMovies = this._getAllMovies();
    const movies = this._getMovies();
    const moviesCount = movies.length;

    this._moviesRatingSort = allMovies
      .slice()
      .sort((prev, next) => next.totalRating - prev.totalRating);
    this._moviesCommentCountSort = allMovies
      .slice()
      .sort((prev, next) => next.comments.length - prev.comments.length);

    if (moviesCount === 0) {
      this._renderNoMovies();
    }

    this._renderMovies(
      movies.slice(0, Math.min(moviesCount, this._renderedMoviesCount))
    );

    this._renderTopRated();
    this._renderMostCommented();
    this._renderHeaderProfile(allMovies);
    this._renderFooterStatistics(allMovies);

    if (moviesCount > this._renderedMoviesCount) {
      this._renderMoreBtn();
    }
  }

  _clearMovies({ resetRenderedMoviesCount = false } = {}) {
    const moviesCount = this._getMovies().length;

    this._moviePresenter.forEach((presenter) => presenter.destroy());
    this._moviePresenter.clear();
    this._mostCommentedPresenter.forEach((presenter) => presenter.destroy());
    this._mostCommentedPresenter.clear();
    this._topRatedPresenter.forEach((presenter) => presenter.destroy());
    this._topRatedPresenter.clear();

    remove(this._moreBtnComponent);
    remove(this._headerProfileComponent);
    remove(this._footerStatisticsComponent);
    if (this._noMoviesComponent) {
      remove(this._noMoviesComponent);
    }

    if (resetRenderedMoviesCount) {
      this._renderedMoviesCount = FILM_STEP_COUNT;
    } else {
      this._renderedMoviesCount = Math.min(
        moviesCount,
        this._renderedMoviesCount
      );
    }
  }
}
