import AbstractObserver from "../utils/abstract-observer.js";

export default class Movies extends AbstractObserver {
  constructor() {
    super();
    this._movies = [];
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
      throw new Error("Can't update unexisting movie");
    }

    this._movies = [
      ...this._movies.slice(0, index),
      update,
      ...this._movies.slice(index + 1),
    ];

    this._notify(updateType, update);

    //     const index = this._tasks.findIndex((task) => task.id === update.id);

    //     if (index === -1) {
    //       throw new Error('Can\'t update unexisting task');
    //     }

    //     this._tasks = [
    //       ...this._tasks.slice(0, index),
    //       update,
    //       ...this._tasks.slice(index + 1),
    //     ];

    //     this._notify(updateType, update);
    //   }

    //   addTask(updateType, update) {
    //     this._tasks = [
    //       update,
    //       ...this._tasks,
    //     ];

    //     this._notify(updateType, update);
    //   }

    //   deleteTask(updateType, update) {
    //     const index = this._tasks.findIndex((task) => task.id === update.id);

    //     if (index === -1) {
    //       throw new Error('Can\'t delete unexisting task');
    //     }

    //     this._tasks = [
    //       ...this._tasks.slice(0, index),
    //       ...this._tasks.slice(index + 1),
    //     ];

    //     this._notify(updateType);
  }
}
