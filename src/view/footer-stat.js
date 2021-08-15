import AbstractView from './abstract-view';

const generateFooterStatTemplate = (filmCount) =>
  `<p>${filmCount} movies inside</p>`;

export default class FooterStat extends AbstractView {
  constructor(filmCount) {
    super();
    this._filmCount = filmCount;
  }

  getTemplate() {
    return generateFooterStatTemplate(this._filmCount);
  }
}
