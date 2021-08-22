import FilmCard from "../view/film-card.js";
import FilmDetails from "../view/film-details.js";
import { render, RenderPosition, remove } from "../utils/render.js";

export default class MoviePresenter {
  constructor(container, movies, bodyContainer) {
    this._container = container;
    this._bodyContainer = bodyContainer;
    this._movies = movies;
    this._openedFilmDetails = null;
  }

  init(film) {
    this._film = film;
    this._renderFilmCard();
  }

  _renderFilmCard() {
    const filmComponent = new FilmCard(this._film);

    const openFilmDetails = (filmId) => {
      const filmForPopup = this._movies.find(
        (item) => Number(item.id) === Number(filmId)
      );
      this._renderFilmDetails(filmForPopup);
    };

    filmComponent.setFilmCardClickHandler((evt) => {
      openFilmDetails(evt.target.dataset.popup);
    });

    render(this._container, filmComponent, RenderPosition.BEFOREEND);
  }

  _removeFilmDetails() {
    remove(this._openedFilmDetails);
    this._openedFilmDetails = null;
  }

  _renderFilmDetails(film) {
    if (this._openedFilmDetails instanceof FilmDetails) {
      this._removeFilmDetails();
    }

    this._openedFilmDetails = new FilmDetails(film);

    this._openedFilmDetails.setCloseBtnClickHandler(() => {
      this._bodyContainer.classList.remove("hide-overflow");
      this._removeFilmDetails();
    });

    this._bodyContainer.classList.add("hide-overflow");
    render(
      this._bodyContainer,
      this._openedFilmDetails,
      RenderPosition.BEFOREEND
    );
  }
}
