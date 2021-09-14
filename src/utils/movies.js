import dayjs from 'dayjs';

const isWatchlist = (movie) => movie.watchlist;

const isHistory = (movie) => movie.alreadyWatched;

const isFavorites = (movie) => movie.favorite;

const sortByDate = (filmA, filmB) => dayjs(filmB.date).diff(dayjs(filmA.date));

const sortByRating = (filmA, filmB) => filmB.totalRating - filmA.totalRating;

export { isWatchlist, isHistory, isFavorites, sortByDate, sortByRating };
