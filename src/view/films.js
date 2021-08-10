import { createElement } from '../utils.js';

const generateFilmsTemplate = () => '<section class="films"></section>';

export default class FilmsContainer {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return generateFilmsTemplate();
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
