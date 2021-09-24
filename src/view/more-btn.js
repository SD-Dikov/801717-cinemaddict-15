import AbstractView from './abstract-view';

const generateMoreBtnTemplate = () =>
  '<button class="films-list__show-more">Show more</button>';

export default class MoreBtn extends AbstractView {
  constructor() {
    super();

    this._clickHandler = this._clickHandler.bind(this);
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().addEventListener('click', this._clickHandler);
  }

  getTemplate() {
    return generateMoreBtnTemplate();
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }
}
