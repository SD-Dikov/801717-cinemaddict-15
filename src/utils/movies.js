const isWatchlist = (movie) => movie.watchlist;

const isHistory = (movie) => movie.alreadyWatched;

const isFavorites = (movie) => movie.favorite;

export { isWatchlist, isHistory, isFavorites };
