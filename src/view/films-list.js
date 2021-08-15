import AbstractView from './abstract-view';

const generateFilmsListTamplate = () => `<section class="films-list">
  <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

  <div class="films-list__container films-list__container--main-list">
  
  </div>

</section>`;
export default class FilmsList extends AbstractView {
  getTemplate() {
    return generateFilmsListTamplate();
  }
}
