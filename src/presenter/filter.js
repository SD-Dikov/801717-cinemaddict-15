import { render, RenderPosition, remove, replace } from "../utils/render.js";
import MainNavigation from "../view/main-navigation.js";
import { filter } from "../utils/filter.js";
import { FilterType, UpdateType } from "../const.js";

export default class FilterPresenter {
  constructor(filterContainer, filterModel, moviesModel, handleSiteMenuClick) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._moviesModel = moviesModel;

    this._handleSiteMenuClick = handleSiteMenuClick;

    this._filterComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);

    this._filterModel.addObserver(this._handleModelEvent);
    this._moviesModel.addObserver(this._handleModelEvent);
  }

  init() {
    const filters = this._getFilters();
    const prevFilterComponent = this._filterComponent;

    this._filterComponent = new MainNavigation(
      filters,
      this._filterModel.getFilter()
    );
    this._filterComponent.setFilterTypeChangeHandler(
      this._handleFilterTypeChange
    );

    this._filterComponent.setSiteMenuItemChangeHandler(
      this._handleSiteMenuClick
    );

    if (prevFilterComponent === null) {
      render(
        this._filterContainer,
        this._filterComponent,
        RenderPosition.BEFOREEND
      );
      return;
    }

    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleFilterTypeChange(filterType) {
    if (this._filterModel.getFilter() === filterType) {
      return;
    }
    this._filterModel.setFilter(UpdateType.MAJOR, filterType);
  }

  _getFilters() {
    const movies = this._moviesModel.getMovies();

    return [
      {
        type: FilterType.ALL,
        name: "All movies",
        count: "",
      },
      {
        type: FilterType.WATCHLIST,
        name: "Watchlist",
        count: filter[FilterType.WATCHLIST](movies).length,
      },
      {
        type: FilterType.HISTORY,
        name: "History",
        count: filter[FilterType.HISTORY](movies).length,
      },
      {
        type: FilterType.FAVORITES,
        name: "Favorites",
        count: filter[FilterType.FAVORITES](movies).length,
      },
    ];
  }
}
