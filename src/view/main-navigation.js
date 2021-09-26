import AbstractView from './abstract-view';
import { MenuItem } from '../const.js';

const generateFilterItemTemplate = (filter, currentFilterType) => {
  const { type, name, count } = filter;

  return `<a href="#${type}" data-type="${type}" data-navigation='movies' class="main-navigation__item ${
    type === currentFilterType ? 'main-navigation__item--active' : ''
  }">
  ${name} 
  ${count ? `<span class="main-navigation__item-count">${count}</span>` : ''}
  </a>`;
};

const generateMainNavigationTemplate = (filterItems, currentFilterType) => {
  const filterItemsTemplate = filterItems
    .map((filter) => generateFilterItemTemplate(filter, currentFilterType))
    .join('');

  return `<nav class="main-navigation">
    <div class="main-navigation__items">
      ${filterItemsTemplate}
    </div>
    <a href="#stats" class="main-navigation__additional" data-navigation='statistics'>Stats</a>
  </nav>`;
};

export default class MainNavigation extends AbstractView {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilterType;
    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
    this._additionalElement = this.getElement().querySelector('.main-navigation__additional');
    this._activeFilterElement = this.getElement().querySelector('.main-navigation__item--active');
    this._siteMenuItemChangeHandler =
      this._siteMenuItemChangeHandler.bind(this);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener('click', this._filterTypeChangeHandler);
  }

  setSiteMenuItemChangeHandler(callback) {
    this._callback.siteMenuItemChange = callback;
    this.getElement().addEventListener(
      'click',
      this._siteMenuItemChangeHandler,
    );
  }

  getTemplate() {
    return generateMainNavigationTemplate(this._filters, this._currentFilter);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    if (evt.target.dataset.type) {
      this._callback.filterTypeChange (evt.target.dataset.type);
      if (!evt.target.classList.contains('main-navigation__item--active')) {
        evt.target.classList.add('main-navigation__item--active');
      }
    }
  }

  _siteMenuItemChangeHandler(evt) {
    evt.preventDefault();
    switch (true) {
      case (evt.target.dataset.navigation === MenuItem.STATISTICS):
        this._additionalElement.classList.add('main-navigation__additional--active');
        this._activeFilterElement.classList.remove('main-navigation__item--active');
        break;
      case (evt.target.dataset.navigation === MenuItem.MOVIES):
        this._additionalElement.classList.remove('main-navigation__additional--active');
        break;
    }
    this._callback.siteMenuItemChange(evt.target.dataset.navigation);
  }
}
