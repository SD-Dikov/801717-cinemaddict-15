import { FilterType } from '../const';
import { isWatchlist, isHistory, isFavorites } from './movies.js';

export const filter = {
  [FilterType.ALL]: (movies) => movies,
  [FilterType.WATCHLIST]: (movies) =>
    movies.filter((movie) => isWatchlist(movie)),
  [FilterType.HISTORY]: (movies) => movies.filter((movie) => isHistory(movie)),
  [FilterType.FAVORITES]: (movies) =>
    movies.filter((movie) => isFavorites(movie)),
};
