const getProfileRating = (films) => {
  const alreadyWatchedFilms = films.filter((item) => item.alreadyWatched);
  const alreadyWatchedFilmsCount = alreadyWatchedFilms.length;

  let profileRating = null;

  if (alreadyWatchedFilmsCount) {
    switch (true) {
      case alreadyWatchedFilmsCount >= 1 && alreadyWatchedFilmsCount <= 10:
        profileRating = "Novice";
        break;
      case alreadyWatchedFilmsCount >= 11 && alreadyWatchedFilmsCount <= 20:
        profileRating = "Fan";
        break;
      case alreadyWatchedFilmsCount >= 21:
        profileRating = "Movie Buff";
        break;
    }
  }
  return profileRating;
};

export { getProfileRating };
