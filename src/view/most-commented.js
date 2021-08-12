import { createElement } from '../utils.js';

const generateMostCommentedTemplate = () =>
  `<section class="films-list films-list--extra">
      <h2 class="films-list__title">Most commented</h2>

      <div class="films-list__container films-list__container--most-commented">
      </div>
    </section>`;

export default class MostCommented {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return generateMostCommentedTemplate();
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
