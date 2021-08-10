import { createElement } from '../utils.js';

const generateFooterStatTemplate = (filmCount) =>
  `<p>${filmCount} movies inside</p>`;

export default class FooterStat {
  constructor(filmCount) {
    this._ilmCount = filmCount;
    this._element = null;
  }

  getTemplate(filmCount) {
    return generateFooterStatTemplate(filmCount);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate(this._filmCount));
    }

    return this._element;
  }

  removeElement() {
    this.getElement = null;
  }
}
