import FilmsContainer from '../view/films.js';
import FilmsList from '../view/films-list.js';
import FilmsListContainer from '../view/films-list-container.js';
import HeaderProfile from '../view/header-profile.js';
import MainNavigation from '../view/main-navigation.js';
import MoreBtn from '../view/more-btn.js';
import SortMenu from '../view/sort-menu.js';
import MoviePresenter from './movie';
import MostCommented from '../view/most-commented.js';
import TopRated from '../view/top-rated.js';
import TopRatedContainer from '../view/top-rated-container.js';
import MostCommentedContainer from '../view/most-commented-container.js';
import { render, RenderPosition, remove } from '../utils/render.js';
import { updateItem } from '../utils/common.js';

const FILM_STEP_COUNT = 5;
const EXTRA_FILM_STEP_COUNT = 2;

export default class MovieList {
  constructor(bodyContainer, mainContainer, headerContainer, footerContainer) {
    this._mainContainer = mainContainer;
    this._bodyContainer = bodyContainer;
    this._headerContainer = headerContainer;
    this._footerContainer = footerContainer;
    this._isPopupRendered = false;

    this._filmsListComponent = new FilmsList();
    this._filmsContainerComponent = new FilmsContainer();
    this._filmsListContainerComponent = new FilmsListContainer();
    this._moreBtnComponent = new MoreBtn();
    this._sortMenuComponent = new SortMenu();
    this._mostCommentedComponent = new MostCommented();
    this._topRatedComponent = new TopRated();
    this._MostCommentedContainerComponent = new MostCommentedContainer();
    this._TopRatedContainerComponent = new TopRatedContainer();

    this._handleMovieChange = this._handleMovieChange.bind(this);
    this._removePopup = this._removePopup.bind(this);
  }

  init(movies) {
    this._movies = movies;
    this._moviesForRender = movies.slice();
    this._moviePresenter = new Map();
    this._moviesRatingSort = movies
      .slice()
      .sort((prev, next) => next.totalRating - prev.totalRating);
    this._moviesCommentCountSort = movies
      .slice()
      .sort((prev, next) => next.comments.length - prev.comments.length);

    render(
      this._mainContainer,
      this._sortMenuComponent,
      RenderPosition.BEFOREEND,
    );

    this._renderMovies();
    this._renderHeaderProfile();
    this._renderMainNavigation();

    render(
      this._mainContainer,
      this._filmsContainerComponent,
      RenderPosition.BEFOREEND,
    );
    render(
      this._filmsContainerComponent,
      this._filmsListComponent,
      RenderPosition.BEFOREEND,
    );
    render(
      this._filmsListComponent,
      this._filmsListContainerComponent,
      RenderPosition.BEFOREEND,
    );
    render(
      this._filmsContainerComponent,
      this._topRatedComponent,
      RenderPosition.BEFOREEND,
    );
    render(
      this._filmsContainerComponent,
      this._mostCommentedComponent,
      RenderPosition.BEFOREEND,
    );
    render(
      this._topRatedComponent,
      this._TopRatedContainerComponent,
      RenderPosition.BEFOREEND,
    );
    render(
      this._mostCommentedComponent,
      this._MostCommentedContainerComponent,
      RenderPosition.BEFOREEND,
    );

    this._renderExstraFilms(
      this._moviesRatingSort,
      this._TopRatedContainerComponent,
    );
    this._renderExstraFilms(
      this._moviesCommentCountSort,
      this._MostCommentedContainerComponent,
    );
    this._renderMoreBtn();
  }

  _handleMovieChange(updatedMovie) {
    this._movies = updateItem(this._movies, updatedMovie);
    this._moviePresenter.get(updatedMovie.id).init(updatedMovie);
  }

  _removePopup() {
    const filmDetailsPopup = this._bodyContainer.querySelector('.film-details');

    if (filmDetailsPopup) {
      filmDetailsPopup.remove();
    }
  }

  _renderHeaderProfile() {
    const headerProfileComponent = new HeaderProfile(this._movies);

    render(
      this._headerContainer,
      headerProfileComponent,
      RenderPosition.BEFOREEND,
    );
  }

  _renderMainNavigation() {
    const mainNavigationComponent = new MainNavigation(this._movies);

    render(
      this._mainContainer,
      mainNavigationComponent,
      RenderPosition.BEFOREEND,
    );
  }

  _renderMoreBtn() {
    render(
      this._filmsListComponent,
      this._moreBtnComponent,
      RenderPosition.BEFOREEND,
    );

    this._moreBtnComponent.setClickHandler(() => {
      this._renderMovies();
      if (!this._moviesForRender.length) {
        remove(this._moreBtnComponent);
      }
    });
  }

  _renderFilmCard(film, container) {
    const moviePresenter = new MoviePresenter(
      container,
      this._movies,
      this._bodyContainer,
      this._handleMovieChange,
      this._removePopup,
    );

    moviePresenter.init(film);

    this._moviePresenter.set(film.id, moviePresenter);
  }

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
        this._filmsListContainerComponent,
      );
    }
    this._moviesForRender.splice(0, filmsCount);
  }
}