import AbstractObserver from "../utils/abstract-observer.js";

export default class Movies extends AbstractObserver {
  constructor() {
    super();
    this._movies = [];
    this._comments = [];
  }

  setMovies(updateType, movies) {
    this._movies = movies.slice();

    this._notify(updateType);
  }

  getMovies() {
    return this._movies;
  }

  updateMovie(updateType, update) {
    const index = this._movies.findIndex(
      (movie) => Number(movie.id) === Number(update.id)
    );

    if (index === -1) {
      throw new Error("Can't update unexisting movie");
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

  addComment(updateType, update) {
    this._comments = update.comments;

    this._notify(updateType);
  }

  deleteComment(updateType, update) {
    // const index = this._comments.findIndex(
    //   (comment) => Number(comment.id) === Number(update)
    // );

    // if (index === -1) {
    //   throw new Error("Can't delete unexisting comment");
    // }
    // this._comments = [
    //   ...this._comments.slice(0, index),
    //   ...this._comments.slice(index + 1),
    // ];

    this._notify(updateType);
  }

  static adaptToClient(movie) {
    const adaptedMovie = Object.assign({}, movie, {
      id: movie.id,
      comments: movie.comments,
      title: movie["film_info"].title,
      alternativeTitle: movie["film_info"]["alternative_title"],
      totalRating: movie["film_info"]["total_rating"],
      poster: movie["film_info"].poster,
      ageRating: movie["film_info"]["age_rating"],
      director: movie["film_info"].director,
      writers: movie["film_info"].writers,
      actors: movie["film_info"].actors,
      date: movie["film_info"]["release"].date,
      releaseCountry: movie["film_info"]["release"]["release_country"],
      runtime: movie["film_info"].runtime,
      genre: movie["film_info"].genre,
      description: movie["film_info"].description,
      watchlist: movie["user_details"].watchlist,
      alreadyWatched: movie["user_details"]["already_watched"],
      watchingDate: movie["user_details"]["watching_date"],
      favorite: movie["user_details"].favorite,
    });

    delete adaptedMovie["film_info"];
    delete adaptedMovie["user_details"];

    return adaptedMovie;
  }

  static adaptToServer(movie) {
    const adaptedMovie = Object.assign({}, movie, {
      id: movie.id,
      comments: movie.comments,
      film_info: {
        title: movie.title,
        alternative_title: movie.alternativeTitle,
        total_rating: movie.totalRating,
        poster: movie.poster,
        age_rating: movie.ageRating,
        director: movie.director,
        writers: movie.writers,
        actors: movie.actors,
        release: {
          date: movie.date,
          release_country: movie.releaseCountry,
        },
        runtime: movie.runtime,
        genre: movie.genre,
        description: movie.description,
      },
      user_details: {
        watchlist: movie.watchlist,
        already_watched: movie.alreadyWatched,
        watching_date: movie.watchingDate,
        favorite: movie.favorite,
      },
    });

    // Ненужные ключи мы удаляем
    delete adaptedMovie.title;
    delete adaptedMovie.alternativeTitle;
    delete adaptedMovie.totalRating;
    delete adaptedMovie.poster;
    delete adaptedMovie.ageRating;
    delete adaptedMovie.director;
    delete adaptedMovie.writers;
    delete adaptedMovie.actors;
    delete adaptedMovie.date;
    delete adaptedMovie.releaseCountry;
    delete adaptedMovie.runtime;
    delete adaptedMovie.genre;
    delete adaptedMovie.description;
    delete adaptedMovie.watchlist;
    delete adaptedMovie.alreadyWatched;
    delete adaptedMovie.watchingDate;
    delete adaptedMovie.favorite;

    return adaptedMovie;
  }
}
