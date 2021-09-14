const UserAction = {
  UPDATE_MOVIE: 'UPDATE_MOVIE',
  DELETE_COMMENT: 'DELETE_COMMENT',
  ADD_COMMENT: 'ADD_COMMENT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

const FilterType = {
  ALL: 'all',
  WATCHLIST: 'watchlist',
  HISTORY: 'history',
  FAVORITES: 'favorites',
};

const State = {
  ADDING: 'ADDING',
  DELETING: 'DELETING',
  ABORTING: 'ABORTING',
  ABORTING_DELETING: 'ABORTING_DELETING',
  ABORTING_ADDING: 'ABORTING_ADDING',
};

const SortType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating',
};

export { UserAction, UpdateType, FilterType, State, SortType };
