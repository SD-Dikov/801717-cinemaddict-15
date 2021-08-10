import { createElement } from '../utils.js';

const generateHeaderProfileTemplate = (films) => {
  const alreadyWatchedFilms = films.filter((item) => item.alreadyWatched);
  const alreadyWatchedFilmsCount = alreadyWatchedFilms.length;

  if (!alreadyWatchedFilmsCount) {
    return;
  }

  let profileRating;

  switch (true) {
    case alreadyWatchedFilmsCount >= 1 && alreadyWatchedFilmsCount <= 10:
      profileRating = 'Novice';
      break;
    case alreadyWatchedFilmsCount >= 11 && alreadyWatchedFilmsCount <= 20:
      profileRating = 'Fan';
      break;
    case alreadyWatchedFilmsCount >= 21:
      profileRating = 'Movie Buff';
      break;
  }
  return `<section class="header__profile profile">
    <p class="profile__rating">${profileRating}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
};

export default class HeaderProfile {
  constructor(films) {
    this._films = films;
    this._element = null;
  }

  getTemplate(films) {
    return generateHeaderProfileTemplate(films);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate(this._films));
    }

    return this._element;
  }

  removeElement() {
    this.getElement = null;
  }
}
