import he from 'he';
import SmartView from './smart-view';
import dayjs from 'dayjs';
import { getHoursMins } from '../utils/common.js';

const SHAKE_ANIMATION_TIMEOUT = 1000;

const getFilmDetailsTemplate = (data, comments) => {
  const {
    title,
    alternativeTitle,
    totalRating,
    poster,
    ageRating,
    date,
    runtime,
    genre,
    description,
    director,
    writers,
    actors,
    releaseCountry,
    watchlist,
    alreadyWatched,
    favorite,
    emojiValue,
    isDeleting,
    isAdding,
    deletingId,
  } = data;

  const commentTextValue = data.commentTextValue || '';

  const hoursMinsRuntime = getHoursMins(runtime);
  const generateGenreMarkup = () =>
    genre.map((item) => `<span class="film-details__genre">${item}</span>`);

  const generateCommentsMarkup = () => {
    const commentsMarkup = comments.map(
      (item) => `<li class="film-details__comment" data-comment="${item.id}">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${
  item.emotion
}.png" width="55" height="55" alt="emoji-${item.emotion}">
    </span>
    <div>
      <p class="film-details__comment-text">${item.comment}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${item.author}</span>
        <span class="film-details__comment-day">${dayjs(item.date).format(
    'YYYY/MMMM/DD/ hh:mm',
  )}</span>
        <button class="film-details__comment-delete" data-comment='${
  item.id
}' ${isDeleting ? 'disabled=\'disabled\' style=\'opacity: 0.5;\'' : ''}>
        ${isDeleting && deletingId === item.id ? 'Deleting...' : 'Delete'}
        </button>
      </p>
    </div>
  </li>`,
    );
    return commentsMarkup;
  };

  return `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="./${poster}" alt="">
  
            <p class="film-details__age">${ageRating}+</p>
          </div>
  
          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${title}</h3>
                <p class="film-details__title-original">${alternativeTitle}</p>
              </div>
  
              <div class="film-details__rating">
                <p class="film-details__total-rating">${totalRating}</p>
              </div>
            </div>
  
            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">${
  writers.length > 1 ? 'Writers' : 'Writer'
}
                </td>
                <td class="film-details__cell">${writers.join(', ')}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${actors.join(', ')}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${dayjs(date).format(
    'DD MMMM YYYY',
  )}
                </td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${hoursMinsRuntime}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${releaseCountry}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">${
  genre.length > 1 ? 'Genres' : 'Genre'
}
                </td>
                <td class="film-details__cell">
                  ${generateGenreMarkup().join('')}
              </tr>
            </table>
  
            <p class="film-details__film-description">
              ${description}
            </p>
          </div>
        </div>
  
        <section class="film-details__controls">
          <button type="button" class="film-details__control-button film-details__control-button--watchlist ${
  watchlist ? 'film-details__control-button--active' : ''
}" id="watchlist" name="watchlist">Add to watchlist</button>
          <button type="button" class="film-details__control-button film-details__control-button--watched ${
  alreadyWatched ? 'film-details__control-button--active' : ''
}" id="watched" name="watched">Already watched</button>
          <button type="button" class="film-details__control-button film-details__control-button--favorite ${
  favorite ? 'film-details__control-button--active' : ''
}" id="favorite" name="favorite">Add to favorites</button>
        </section>
      </div>
  
      <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${
  comments.length
}</span></h3>
  
          <ul class="film-details__comments-list">
            ${comments.length ? generateCommentsMarkup().join(' ') : ''}
          </ul>
  
          <div class="film-details__new-comment">
            <div class="film-details__add-emoji-label">
              ${
  emojiValue
    ? `<img src="./images/emoji/${emojiValue}.png" width="55" height="55" alt=emoji-${emojiValue}></img>`
    : ''
}
            </div>
  
            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment" ${
  isAdding ? 'disabled=\'disabled\' style=\'opacity: 0.5;\'' : ''
}>${he.encode(commentTextValue)}</textarea>
            </label>
  
            <div class="film-details__emoji-list">
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile" ${
  isAdding ? 'disabled=\'disabled\'' : ''
}>
              <label class="film-details__emoji-label" for="emoji-smile">
                <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
              </label>
  
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping" ${
  isAdding ? 'disabled=\'disabled\'' : ''
}>
              <label class="film-details__emoji-label" for="emoji-sleeping">
                <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
              </label>
  
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke" ${
  isAdding ? 'disabled=\'disabled\'' : ''
}>
              <label class="film-details__emoji-label" for="emoji-puke">
                <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
              </label>
  
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry" ${
  isAdding ? 'disabled=\'disabled\'' : ''
}>
              <label class="film-details__emoji-label" for="emoji-angry">
                <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
              </label>
            </div>
          </div>
        </section>
      </div>
    </form>
  </section>`;
};

export default class FilmDetails extends SmartView {
  constructor(film, comments) {
    super();
    this._data = FilmDetails.parseFilmToData(film);
    this._comments = comments;
    this._closeBtnClickHandler = this._closeBtnClickHandler.bind(this);
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
    this._alreadyWatchedClickHandler =
      this._alreadyWatchedClickHandler.bind(this);
    this._addToFavoritesClickHandler =
      this._addToFavoritesClickHandler.bind(this);
    this._emojiRadioHendler = this._emojiRadioHendler.bind(this);
    this._commentInputHendler = this._commentInputHendler.bind(this);
    this._deleteCommentClickHandler =
      this._deleteCommentClickHandler.bind(this);
    this._addCommentKeyHendler = this._addCommentKeyHendler.bind(this);
    this._resetFormState = this._resetFormState.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return getFilmDetailsTemplate(this._data, this._comments);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setCloseBtnClickHandler(this._callback.closeBtnClick);
    this.setWatchlistClickHandler(this._callback.watchlistClick);
    this.setAlreadyWatchedClickHandler(this._callback.alreadyWatchedClick);
    this.setAddToFavoritesClickHandler(this._callback.addToFavoritesClick);
    this.setDeleteCommentHandler(this._callback.deleteCommentClick);
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector('.film-details__emoji-list')
      .addEventListener('input', this._emojiRadioHendler);
    this.getElement()
      .querySelector('.film-details__comment-input')
      .addEventListener('input', this._commentInputHendler);
  }

  _emojiRadioHendler(evt) {
    evt.preventDefault();
    const posTop = this.getElement().scrollTop;
    const emojiValue = evt.target.value;
    this.updateData({
      emojiValue,
    });
    document
      .querySelector(`#emoji-${emojiValue}`)
      .setAttribute('checked', 'true');
    this.getElement().scrollTop = posTop;
  }

  _commentInputHendler(evt) {
    evt.preventDefault();
    const posTop = this.getElement().scrollTop;
    const comentInputValue = evt.target.value;
    this.updateData({ commentTextValue: comentInputValue }, true);
    this.getElement().scrollTop = posTop;
  }

  _resetFormState() {
    this.updateData({
      isAdding: false,
      isDeleting: false,
    });
  }

  _closeBtnClickHandler(evt) {
    evt.preventDefault();
    this._callback.closeBtnClick();
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

  _deleteCommentClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteCommentClick(evt);
  }

  _addCommentKeyHendler(evt) {
    this._callback.addCommentKey(evt, this._data);
  }

  setCloseBtnClickHandler(callback) {
    this._callback.closeBtnClick = callback;
    this.getElement()
      .querySelector('.film-details__close-btn')
      .addEventListener('click', this._closeBtnClickHandler);
  }

  setWatchlistClickHandler(callback) {
    this._callback.watchlistClick = callback;
    this.getElement()
      .querySelector('.film-details__control-button--watchlist')
      .addEventListener('click', this._watchlistClickHandler);
  }

  setAlreadyWatchedClickHandler(callback) {
    this._callback.alreadyWatchedClick = callback;
    this.getElement()
      .querySelector('.film-details__control-button--watched')
      .addEventListener('click', this._alreadyWatchedClickHandler);
  }

  setAddToFavoritesClickHandler(callback) {
    this._callback.addToFavoritesClick = callback;
    this.getElement()
      .querySelector('.film-details__control-button--favorite')
      .addEventListener('click', this._addToFavoritesClickHandler);
  }

  setDeleteCommentHandler(callback) {
    this._callback.deleteCommentClick = callback;
    this.getElement()
      .querySelector('.film-details__comments-list')
      .addEventListener('click', this._deleteCommentClickHandler);
  }

  setAddCommentHandler(callback) {
    this._callback.addCommentKey = callback;
    document.addEventListener('keydown', this._addCommentKeyHendler);
  }

  removeCommentHandlerEvent() {
    document.removeEventListener('keydown', this._addCommentKeyHendler);
  }

  shakeAdd({ resetState = false } = {}) {
    const posTop = this.getElement().scrollTop;
    const element = document.querySelector('.film-details__new-comment');
    element.style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    setTimeout(() => {
      element.style.animation = '';
      if (resetState) {
        this._resetFormState();
      }
      this.getElement().scrollTop = posTop;
    }, SHAKE_ANIMATION_TIMEOUT);
  }

  shakeDelete(commentId) {
    const posTop = this.getElement().scrollTop;
    const element = document.querySelector(
      `.film-details__comment[data-comment="${commentId}"]`,
    );
    element.style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    setTimeout(() => {
      element.style.animation = '';
      this._resetFormState();
      this.getElement().scrollTop = posTop;
    }, SHAKE_ANIMATION_TIMEOUT);
  }

  static parseFilmToData(film) {
    film = Object.assign({}, film, {
      emojiValue: null,
    });

    delete film.isDeleting;
    delete film.isAdding;
    delete film.deletingId;

    return film;
  }
}
