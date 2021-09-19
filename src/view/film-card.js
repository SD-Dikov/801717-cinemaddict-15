import AbstractView from './abstract-view';
import dayjs from 'dayjs';
import { getHoursMins } from '../utils/common.js';

const SYMBOL_COUNT = 139;

const getFilmCardTemplate = (film) => {
  const {
    id,
    comments,
    title,
    totalRating,
    poster,
    date,
    runtime,
    genre,
    description,
    watchlist,
    alreadyWatched,
    favorite,
  } = film;
  const hoursMinsRuntime = getHoursMins(runtime);

  return `<article class="film-card">
    <h3 class="film-card__title" data-popup="${id}">${title}</h3>
    <p class="film-card__rating">${totalRating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${dayjs(date).format('YYYY')}</span>
      <span class="film-card__duration">${
  hoursMinsRuntime.hours ? `${hoursMinsRuntime.hours}h` : ''
} ${hoursMinsRuntime.minutes ? `${hoursMinsRuntime.minutes}m` : ''}</span>
      <span class="film-card__genre">${genre.join(', ')}</span>
    </p>
    <img src="./${poster}" alt="" class="film-card__poster" data-popup="${id}">
    <p class="film-card__description">${
  description.length > SYMBOL_COUNT
    ? `${description.slice(0, SYMBOL_COUNT)}...`
    : description
}</p>
    <a class="film-card__comments" data-popup="${id}">${
  comments.length
} comments</a>
    <div class="film-card__controls">
      <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${
  watchlist ? 'film-card__controls-item--active' : ''
}" type="button">Add to watchlist</button>
      <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${
  alreadyWatched ? 'film-card__controls-item--active' : ''
}" type="button">Mark as watched</button>
      <button class="film-card__controls-item film-card__controls-item--favorite ${
  favorite ? 'film-card__controls-item--active' : ''
}" type="button">Mark as favorite</button>
    </div>
  </article>`;
};

export default class FilmCard extends AbstractView {
  constructor(film) {
    super();
    this._film = film;
    this._linkElementsList = [
      '.film-card__title',
      '.film-card__poster',
      '.film-card__comments',
    ];
    this._filmCardClickHandler = this._filmCardClickHandler.bind(this);
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
    this._alreadyWatchedClickHandler =
      this._alreadyWatchedClickHandler.bind(this);
    this._addToFavoritesClickHandler =
      this._addToFavoritesClickHandler.bind(this);
  }

  getTemplate() {
    return getFilmCardTemplate(this._film);
  }

  _filmCardClickHandler(evt) {
    evt.preventDefault();
    this._callback.filmCardClick(evt);
  }

  _watchlistClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchlistClick(evt);
  }

  _alreadyWatchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.alreadyWatchedClick(evt);
  }

  _addToFavoritesClickHandler(evt) {
    evt.preventDefault();
    this._callback.addToFavoritesClick(evt);
  }

  setFilmCardClickHandler(callback) {
    this._callback.filmCardClick = callback;
    this._linkElementsList.forEach((item) => {
      const element = this.getElement().querySelector(item);
      element.style.cursor = 'pointer';
      element.addEventListener('click', this._filmCardClickHandler);
    });
  }

  setWatchlistClickHandler(callback) {
    this._callback.watchlistClick = callback;
    this.getElement()
      .querySelector('.film-card__controls-item--add-to-watchlist')
      .addEventListener('click', this._watchlistClickHandler);
  }

  setAlreadyWatchedClickHandler(callback) {
    this._callback.alreadyWatchedClick = callback;
    this.getElement()
      .querySelector('.film-card__controls-item--mark-as-watched')
      .addEventListener('click', this._alreadyWatchedClickHandler);
  }

  setAddToFavoritesClickHandler(callback) {
    this._callback.addToFavoritesClick = callback;
    this.getElement()
      .querySelector('.film-card__controls-item--favorite')
      .addEventListener('click', this._addToFavoritesClickHandler);
  }
}
