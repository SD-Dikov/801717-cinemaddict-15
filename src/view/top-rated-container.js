import AbstractView from "./abstract-view";

const generateTopRatedTemplate = () =>
  `<div class="films-list__container films-list__container--top-rated"></div>`;

export default class TopRatedContainer extends AbstractView {
  getTemplate() {
    return generateTopRatedTemplate();
  }
}
