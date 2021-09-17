import AbstractView from "./abstract-view";

const generateFilterItemTemplate = (filter, currentFilterType) => {
  const { type, name, count } = filter;

  return `<a href="#${type}" data-type="${type}" class="main-navigation__item ${
    type === currentFilterType ? "main-navigation__item--active" : ""
  }">
  ${name} 
  ${count ? `<span class="main-navigation__item-count">${count}</span>` : ""}
  </a>`;
};

const generateMainNavigationTemplate = (filterItems, currentFilterType) => {
  const filterItemsTemplate = filterItems
    .map((filter) => generateFilterItemTemplate(filter, currentFilterType))
    .join("");

  return `<nav class="main-navigation">
    <div class="main-navigation__items" data-navigation='movies'>
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
    this._siteMenuItemChangeHandler =
      this._siteMenuItemChangeHandler.bind(this);
  }

  getTemplate() {
    return generateMainNavigationTemplate(this._filters, this._currentFilter);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.dataset.type);
  }

  _siteMenuItemChangeHandler(evt) {
    evt.preventDefault();
    this.getElement().querySelector(
      ".main-navigation__additional"
    ).disabled = true;
    this._callback.siteMenuItemChange(evt.target.dataset.navigation);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener("click", this._filterTypeChangeHandler);
  }

  setSiteMenuItemChangeHandler(callback) {
    this._callback.siteMenuItemChange = callback;
    this.getElement().addEventListener(
      "click",
      this._siteMenuItemChangeHandler
    );
  }
}
