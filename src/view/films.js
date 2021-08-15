import AbstractView from './abstract-view';

const generateFilmsTemplate = () => '<section class="films"></section>';

export default class FilmsContainer extends AbstractView {
  getTemplate() {
    return generateFilmsTemplate();
  }
}
