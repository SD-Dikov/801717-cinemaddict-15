import AbstractView from "./abstract-view";

const generateMostCommentedTemplate = () =>
  `<section class="films-list films-list--extra">
      <h2 class="films-list__title">Most commented</h2>
    </section>`;

export default class MostCommented extends AbstractView {
  getTemplate() {
    return generateMostCommentedTemplate();
  }
}
