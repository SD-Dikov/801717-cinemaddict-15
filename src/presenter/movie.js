import FilmCard from '../view/film-card.js';
import { render, RenderPosition, remove, replace } from '../utils/render.js';
import { UserAction, UpdateType } from '../const.js';

export default class MoviePresenter {
  constructor(container, changeData, openPopup) {
    this._container = container;

    this._changeData = changeData;
    this._openPopup = openPopup;
    this._filmComponent = null;
    this._detailComponent = null;

    this._handleFilmCardClick = this._handleFilmCardClick.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleAlreadyWatchedClick =
      this._handleAlreadyWatchedClick.bind(this);
    this._handleAddToFavoritesClick =
      this._handleAddToFavoritesClick.bind(this);
  }

  init(film) {
    this._film = film;

    const prevFilmComponent = this._filmComponent;

    this._filmComponent = new FilmCard(this._film);

    this._filmComponent.setFilmCardClickHandler(this._handleFilmCardClick);
    this._filmComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._filmComponent.setAlreadyWatchedClickHandler(
      this._handleAlreadyWatchedClick,
    );
    this._filmComponent.setAddToFavoritesClickHandler(
      this._handleAddToFavoritesClick,
    );

    if (prevFilmComponent === null) {
      this._renderFilmCard();
      return;
    }

    if (this._container.getElement().contains(prevFilmComponent.getElement())) {
      replace(this._filmComponent, prevFilmComponent);
    }

    remove(prevFilmComponent);
  }

  destroy() {
    remove(this._filmComponent);
  }

  _renderFilmCard() {
    render(this._container, this._filmComponent, RenderPosition.BEFOREEND);
  }

  _handleFilmCardClick() {
    this._openPopup(this._film);
  }

  _handleWatchlistClick() {
    this._changeData(
      UserAction.UPDATE_MOVIE,
      UpdateType.MINOR,
      Object.assign({}, this._film, {
        watchlist: !this._film.watchlist,
      }),
    );
  }

  _handleAlreadyWatchedClick() {
    this._changeData(
      UserAction.UPDATE_MOVIE,
      UpdateType.MINOR,
      Object.assign({}, this._film, {
        alreadyWatched: !this._film.alreadyWatched,
      }),
    );
  }

  _handleAddToFavoritesClick() {
    this._changeData(
      UserAction.UPDATE_MOVIE,
      UpdateType.MINOR,
      Object.assign({}, this._film, {
        favorite: !this._film.favorite,
      }),
    );
  }
}
