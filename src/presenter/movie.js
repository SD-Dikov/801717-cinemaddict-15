// import FilmCard from "./view/film-card.js";
// import FilmDetails from "./view/film-details.js";
// import MostCommented from "./view/most-commented.js";
// import TopRated from "./view/top-rated.js";
// import { render, RenderPosition, remove } from "./utils/render.js";

// export default class Movie {
//   constructor(movieContainer, film, movies) {
//     this._movieContainer = movieContainer;
//     this._film = film;
//     this._movies = movies;
//     this.openedFilmDetails = null;

//     this._filmCardComponent = new FilmCard(this._film);
//     this._filmDetailsComponent = new FilmDetails(this._film);
//     this._mostCommentedComponent = new MostCommented();
//     this._topRatedComponent = new TopRated();
//   }

//   _renderFilmCard() {
//     const openFilmDetails = (filmId) => {
//       const filmForPopup = this._movies.find(
//         (item) => Number(item.id) === Number(filmId)
//       );
//       this._renderFilmDetails(filmForPopup);
//     };

//     this._movieContainer.setFilmCardClickHandler((evt) => {
//       openFilmDetails(evt.target.dataset.popup);
//     });

//     render(
//       this._movieContainer,
//       this._filmCardComponent,
//       RenderPosition.BEFOREEND
//     );
//   }

//   _removeFilmDetails() {
//     remove(this.openedFilmDetails);
//     this.openedFilmDetails = null;
//   }

//   _renderFilmDetails() {
//     const body = document.querySelector("body");

//     if (this.openedFilmDetails instanceof FilmDetails) {
//       this._removeFilmDetails();
//     }

//     this.openedFilmDetails = this._filmDetailsComponent;

//     this.openedFilmDetails.setCloseBtnClickHandler(() => {
//       body.classList.remove("hide-overflow");
//       this._removeFilmDetails();
//     });

//     body.classList.add("hide-overflow");
//     render(
//       this._movieContainer,
//       this.openedFilmDetails,
//       RenderPosition.BEFOREEND
//     );
//   }
//   _renderMostCommented() {}
//   _renderTopRated() {}
// }
