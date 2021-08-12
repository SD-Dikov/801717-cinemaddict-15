import { createElement } from '../utils.js';

const generateMoreBtnTemplate = () =>
  '<button class="films-list__show-more">Show more</button>';

export default class MoreBtn {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return generateMoreBtnTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this.getElement = null;
  }
}
