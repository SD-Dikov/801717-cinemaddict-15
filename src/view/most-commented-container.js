import AbstractView from "./abstract-view";

const generateMostCommentedTemplate = () =>
  `<div class="films-list__container films-list__container--most-commented"></div>`;

export default class MostCommentedContainer extends AbstractView {
  getTemplate() {
    return generateMostCommentedTemplate();
  }
}
