import AbstractObserver from '../utils/abstract-observer.js';

export default class Movies extends AbstractObserver {
  constructor() {
    super();
    this._movies = [];
    this._comments = [];
  }

  setMovies(movies) {
    this._movies = movies.slice();
  }

  getMovies() {
    return this._movies;
  }

  updateMovie(updateType, update) {
    const index = this._movies.findIndex((movie) => movie.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting movie');
    }
    this._movies = [
      ...this._movies.slice(0, index),
      update,
      ...this._movies.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  setComments(comments) {
    this._comments = comments.slice();
  }

  getComments() {
    return this._comments;
  }

  addComment(updateType, update, currentMovie) {
    this._comments = [update, ...this._comments];

    this.updateMovie(
      updateType,
      Object.assign({}, currentMovie, {
        comments: this._comments,
      }),
    );
  }

  deleteComment(updateType, update, currentMovie) {
    const index = this._comments.findIndex(
      (comment) => Number(comment.id) === Number(update),
    );

    if (index === -1) {
      throw new Error('Can\'t delete unexisting comment');
    }
    this._comments = [
      ...this._comments.slice(0, index),
      ...this._comments.slice(index + 1),
    ];

    this.updateMovie(
      updateType,
      Object.assign({}, currentMovie, {
        comments: this._comments,
      }),
    );
  }
}
