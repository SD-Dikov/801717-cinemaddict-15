import dayjs from "dayjs";
import { getHoursMins, createElement } from "../utils.js";
const SYMBOL_COUNT = 140;

const getFilmCardTemplate = (film) => {
  const {
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
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${totalRating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${dayjs(date).format("YYYY")}</span>
      <span class="film-card__duration">${hoursMinsRuntime}</span>
      <span class="film-card__genre">${genre.join(", ")}</span>
    </p>
    <img src="./${poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${
      description.length > SYMBOL_COUNT
        ? `${description.slice(0, SYMBOL_COUNT)}...`
        : description
    }</p>
    <a class="film-card__comments">${comments.length} comments</a>
    <div class="film-card__controls">
      <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${
        watchlist ? "film-card__controls-item--active" : ""
      }" type="button">Add to watchlist</button>
      <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${
        alreadyWatched ? "film-card__controls-item--active" : ""
      }" type="button">Mark as watched</button>
      <button class="film-card__controls-item film-card__controls-item--favorite ${
        favorite ? "film-card__controls-item--active" : ""
      }" type="button">Mark as favorite</button>
    </div>
  </article>`;
};

export default class FilmCard {
  constructor(film) {
    this._element = null;
    this.film = film;
  }

  getTemplate(film) {
    return getFilmCardTemplate(film);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate(this.film));
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
