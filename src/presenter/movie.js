import FilmCard from "../view/film-card.js";
import FilmDetails from "../view/film-details.js";
import { render, RenderPosition, remove, replace } from "../utils/render.js";
import { UserAction, UpdateType } from "../const.js";

export default class MoviePresenter {
  constructor(container, movies, bodyContainer, changeData, removePopup) {
    this._container = container;
    this._bodyContainer = bodyContainer;

    this._movies = movies;
    this._removePopup = removePopup;
    this._changeData = changeData;
    this._filmComponent = null;
    this._detailComponent = null;

    this._handleFilmCardClick = this._handleFilmCardClick.bind(this);
    this._handleCloseBtnClick = this._handleCloseBtnClick.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleAlreadyWatchedClick =
      this._handleAlreadyWatchedClick.bind(this);
    this._handleAddToFavoritesClick =
      this._handleAddToFavoritesClick.bind(this);
  }

  init(film, isPopupRendered) {
    this._film = film;
    this._isPopupRendered = isPopupRendered;

    const prevFilmComponent = this._filmComponent;
    const prevDetailComponent = this._detailComponent;

    this._filmComponent = new FilmCard(this._film);
    this._detailComponent = new FilmDetails(this._film);

    this._filmComponent.setFilmCardClickHandler(this._handleFilmCardClick);
    this._filmComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._filmComponent.setAlreadyWatchedClickHandler(
      this._handleAlreadyWatchedClick
    );
    this._filmComponent.setAddToFavoritesClickHandler(
      this._handleAddToFavoritesClick
    );

    this._detailComponent.setCloseBtnClickHandler(this._handleCloseBtnClick);
    this._detailComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._detailComponent.setAlreadyWatchedClickHandler(
      this._handleAlreadyWatchedClick
    );
    this._detailComponent.setAddToFavoritesClickHandler(
      this._handleAddToFavoritesClick
    );

    if (prevFilmComponent === null || prevDetailComponent === null) {
      this._renderFilmCard();
      return;
    }

    if (this._container.getElement().contains(prevFilmComponent.getElement())) {
      replace(this._filmComponent, prevFilmComponent);
    }

    if (this._bodyContainer.contains(prevDetailComponent.getElement())) {
      const posTop = prevDetailComponent.getElement().scrollTop;
      replace(this._detailComponent, prevDetailComponent);
      this._detailComponent.getElement().scrollTop = posTop;
    }

    remove(prevFilmComponent);
    remove(prevDetailComponent);
  }

  _removeFilmDetails() {
    this._detailComponent.getElement().remove();
    this._bodyContainer.classList.remove("hide-overflow");
  }

  _handleCloseBtnClick() {
    this._removeFilmDetails();
  }

  _renderFilmDetails() {
    this._bodyContainer.classList.add("hide-overflow");

    render(
      this._bodyContainer,
      this._detailComponent,
      RenderPosition.BEFOREEND
    );
  }

  _renderFilmCard() {
    render(this._container, this._filmComponent, RenderPosition.BEFOREEND);
  }

  _handleFilmCardClick() {
    this._removePopup();
    this._renderFilmDetails();
  }

  _handleWatchlistClick() {
    this._changeData(
      UserAction.UPDATE_MOVIE,
      UpdateType.MINOR,
      Object.assign({}, this._film, {
        watchlist: !this._film.watchlist,
      })
    );
  }

  _handleAlreadyWatchedClick() {
    this._changeData(
      UserAction.UPDATE_MOVIE,
      UpdateType.MINOR,
      Object.assign({}, this._film, {
        alreadyWatched: !this._film.alreadyWatched,
      })
    );
  }

  _handleAddToFavoritesClick() {
    this._changeData(
      UserAction.UPDATE_MOVIE,
      UpdateType.MINOR,
      Object.assign({}, this._film, {
        favorite: !this._film.favorite,
      })
    );
  }
}
