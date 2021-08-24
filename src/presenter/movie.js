import FilmCard from "../view/film-card.js";
import FilmDetails from "../view/film-details.js";
import { render, RenderPosition, remove, replace } from "../utils/render.js";

// let openedFilmDetails = null;

export default class MoviePresenter {
  constructor(container, movies, bodyContainer, changeData) {
    this._container = container;
    this._bodyContainer = bodyContainer;
    this._movies = movies;
    this._changeData = changeData;

    this._filmComponent = null;
    this._detailComponent = null;

    this._handleFilmCardClick = this._handleFilmCardClick.bind(this);
    this._handleCloseBtnClick = this._handleCloseBtnClick.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
  }

  init(film) {
    this._film = film;

    const prevFilmComponent = this._filmComponent;
    const prevDetailComponent = this._detailComponent;

    this._filmComponent = new FilmCard(this._film);
    this._detailComponent = new FilmDetails(this._film);

    this._filmComponent.setFilmCardClickHandler(this._handleFilmCardClick);
    this._filmComponent.setwatchlistClickHandler(this._handleWatchlistClick);
    this._detailComponent.setwatchlistClickHandler(this._handleWatchlistClick);
    this._detailComponent.setCloseBtnClickHandler(this._handleCloseBtnClick);

    if (prevFilmComponent === null || prevDetailComponent === null) {
      this._renderFilmCard();
      return;
    }

    if (this._container.getElement().contains(prevFilmComponent.getElement())) {
      replace(this._filmComponent, prevFilmComponent);
    }
    if (this._bodyContainer.contains(prevDetailComponent.getElement())) {
      console.log("privet");
      replace(this._detailComponent, prevDetailComponent);
    }

    remove(prevFilmComponent);
    remove(prevDetailComponent);
  }

  // _removeFilmDetails() {
  //   remove(openedFilmDetails);
  //   openedFilmDetails = null;
  //   this._bodyContainer.classList.remove("hide-overflow");
  // }

  // _renderFilmDetails(film) {
  //   if (openedFilmDetails instanceof FilmDetails) {
  //     this._removeFilmDetails();
  //   }

  //   openedFilmDetails = new FilmDetails(film);

  //   openedFilmDetails.setCloseBtnClickHandler(() => {
  //     this._removeFilmDetails();
  //   });

  //   this._bodyContainer.classList.add("hide-overflow");
  //   render(this._bodyContainer, openedFilmDetails, RenderPosition.BEFOREEND);
  // }

  _removeFilmDetails() {
    remove(this._detailComponent);
    this._bodyContainer.classList.remove("hide-overflow");
  }

  _handleCloseBtnClick() {
    this._removeFilmDetails();
  }

  _renderFilmDetails() {
    // if (this._detailComponent instanceof FilmDetails) {
    //   this._removeFilmDetails();
    // }

    // this._detailComponent = new FilmDetails(film);

    // this._detailComponent.setCloseBtnClickHandler(this._handleCloseBtnClick);

    this._bodyContainer.classList.add("hide-overflow");

    render(
      this._bodyContainer,
      this._detailComponent,
      RenderPosition.BEFOREEND
    );
  }

  _renderFilmCard() {
    // const filmComponent = new FilmCard(this._film);

    // const openFilmDetails = (filmId) => {
    //   const filmForPopup = this._movies.find(
    //     (item) => Number(item.id) === Number(filmId)
    //   );
    //   this._renderFilmDetails(filmForPopup);
    // };

    // filmComponent.setFilmCardClickHandler((evt) => {
    //   openFilmDetails(evt.target.dataset.popup);
    // });

    render(this._container, this._filmComponent, RenderPosition.BEFOREEND);
  }

  _handleFilmCardClick(evt) {
    // const openFilmDetails = (filmId) => {
    //   const filmForPopup = this._movies.find(
    //     (item) => Number(item.id) === Number(filmId)
    //   );
    //   this._renderFilmDetails(filmForPopup);
    // };

    this._openFilmDetails(evt.target.dataset.popup);
  }

  _openFilmDetails(filmId) {
    const filmForPopup = this._movies.find(
      (item) => Number(item.id) === Number(filmId)
    );
    this._renderFilmDetails(filmForPopup);
  }

  _handleWatchlistClick() {
    this._changeData(
      Object.assign({}, this._film, {
        watchlist: !this._film.watchlist,
      })
    );
    console.log(this._film);
  }
}
