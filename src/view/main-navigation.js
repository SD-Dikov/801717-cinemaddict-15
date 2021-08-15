import AbstractView from './abstract-view';

const getMainNavigationTemplate = (films) => {
  const watchingFilms = films.filter((item) => item.watchlist);
  const alreadyWatchedFilms = films.filter((item) => item.alreadyWatched);
  const favoriteFilms = films.filter((item) => item.favorite);

  return `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${watchingFilms.length}</span></a>
      <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${alreadyWatchedFilms.length}</span></a>
      <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${favoriteFilms.length}</span></a>
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};

export default class MainNavigation extends AbstractView {
  constructor(films) {
    super();
    this._films = films;
  }

  getTemplate() {
    return getMainNavigationTemplate(this._films);
  }
}
