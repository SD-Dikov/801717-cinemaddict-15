import AbstractView from './abstract-view';

const generateFilmsListTamplate = () =>
  '<div class="films-list__container films-list__container--main-list"></div>';
export default class FilmsListContainer extends AbstractView {
  getTemplate() {
    return generateFilmsListTamplate();
  }
}
