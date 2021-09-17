import AbstractView from "./abstract-view";
import { getProfileRating } from "../utils/statistics.js";

const generateHeaderProfileTemplate = (films) => {
  const profileRating = getProfileRating(films);

  return `<section class="header__profile profile">
    ${
      profileRating
        ? `<p class="profile__rating">${profileRating}</p><img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">`
        : ""
    }
  </section>`;
};

export default class HeaderProfile extends AbstractView {
  constructor(films) {
    super();
    this._films = films;
  }

  getTemplate() {
    return generateHeaderProfileTemplate(this._films);
  }
}
