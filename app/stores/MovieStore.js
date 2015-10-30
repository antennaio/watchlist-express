import reqwest from 'reqwest';
import alt from '../alt';
import MovieActions from '../actions/MovieActions';

var movieStore = alt.createStore(class MovieStore {
  constructor() {
    // Initial state
    this.movies = [];

    /*
     * Binding listeners to actions, here again we use a shorthand to omit a rather
     * big chunk of boilerplate:
     * 
     * this.bindListeners({
     *   onGetMoviesSuccess: MovieActions.getMoviesSuccess,
     *   onGetMoviesFail: MovieActions.getMoviesFail,
     *   onCreateSuccess: MovieActions.createSuccess,
     *   onToggleWatchedSuccess: MovieActions.toggleWatchedSuccess,
     *   onDestroySuccess: MovieActions.destroySuccess
     * });
     * 
     */
    this.bindActions(MovieActions);
  }

  onGetMoviesSuccess(resp) {
    this.movies = resp;
  }

  onGetMoviesFail(err) {

    // Not worrying about error handling too much right now
    console.log(err);
  }

  onCreateSuccess(resp) {
    this.movies.push(resp);
  }

  onToggleWatchedSuccess(resp) {
    let movieId = resp._id;

    this.movies = this.movies.map((movie) => {
      if (movie._id == movieId) {
        movie.watched = !movie.watched;
      }
      return movie;
    });
  }

  onDestroySuccess(resp) {
    this.movies = this.movies.filter((movie) => {
      return movie._id !== resp._id;
    });
  }
});

module.exports = movieStore
