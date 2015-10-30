import React from 'react';
import AddMovieField from './AddMovieField.js';
import MovieList from './MovieList.js';
import MovieStore from '../stores/MovieStore';
import MovieActions from '../actions/MovieActions';
import connectToStores from 'alt/utils/connectToStores';

class App extends React.Component {
  /*
   * A higher-order function (connectToStores) wraps the React component for store
   * listening. Two static methods save us from writing a lot of boilerplate:
   *
   * constructor() {
   *   super();
   *   this.state = MovieStore.getState();
   * }
   * 
   * componentDidMount() {
   *   MovieStore.listen(this.onChange);
   * },
   * 
   * componentWillUnmount() {
   *   MovieStore.unlisten(this.onChange);
   * },
   * 
   * onChange(state) {
   *   this.setState(state);
   * }
   * 
   */
  static getStores() {
    return [MovieStore];
  }

  static getPropsFromStores() {
    return MovieStore.getState();
  }

  componentDidMount() {

    // Loading initial data from server
    MovieActions.getMovies();
  }

  render() {

    // We are going to pass a subset of movies (unwatched) to MovieList component
    let movies = this.props.movies.filter((movie) => {
      return !movie.watched;
    });

    // We are going to pass a subset of movies (watched) to MovieList component
    let watchedMovies = this.props.movies.filter((movie) => {
      return movie.watched;
    });

    return (
      <div className="ui grid container">
        <div className="row">
          <div className="ui single column stackable">
            <AddMovieField id="new-movie" placeholder="Movie..." />
          </div>
        </div>
        <div className="row">
          <div className="column">
            <div className="ui two column grid stackable">
              <MovieList title="Watchlist" movies={movies} />
              <MovieList title="Watched" movies={watchedMovies} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = connectToStores(App);
