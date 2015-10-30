import React from 'react';
import Movie from './Movie';

class MovieList extends React.Component {
  constructor(props) {
    super(props);

    /*
     * The data (movies) comes from the higher level component as props. We are
     * going to use state to manage filtering of movies.
     */
    this.state = {
      filteredMovies: [],
      filtering: false,
      keyword: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.filtering) {

      /*
       * If the movies got deleted or watched/unwatched we have to reflect it
       * in the filteredMovies array.
       */
      this.setState({ filteredMovies: this.filterMovies(nextProps.movies) });
    }
  }

  filterMovies(movies) {
    return movies.filter((movie) => {

      // search by keyword
      return movie.title.toLowerCase().search(this.state.keyword.toLowerCase()) !== -1;
    });
  }

  filterList(event) {
    let keyword = event.target.value;

    if (!keyword) {
      this.setState({ filtering: false });
      return;
    }

    this.setState({
      filteredMovies: this.filterMovies(this.props.movies),
      filtering: true,
      keyword: keyword
    });
  }

  render() {
    let movieList = [];
    let movies = this.state.filtering ? this.state.filteredMovies : this.props.movies;

    if (movies.length) {
      movies.map((movie) => {
        movieList.push(<Movie key={movie._id} movie={movie} />);
      });
    }

    if (this.props.movies.length == 0) {
      return (
        <div className="column">
          <h4>{this.props.title}</h4>
          No movies on this list.
        </div>
      );
    }

    return (
      <div className="column">
        <h4>
          {this.props.title} &nbsp;
          <div className="ui label basic circular">
            {this.state.filtering ?
              'Showing ' + this.state.filteredMovies.length
                + ' out of ' + this.props.movies.length : this.props.movies.length}
          </div>
        </h4>
        
        <div className="ui top attached menu">
          <div className="right menu">
            <div className="ui right aligned search item">
              <div className="ui transparent icon input">
                <input
                  className="prompt"
                  placeholder="Search movies..."
                  onChange={this.filterList.bind(this)}
                />
                <i className="search link icon"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="ui bottom attached segment">
          <div className="ui divided items">
            {movieList.length ? movieList : 'Nothing found.'}
          </div>
        </div>
      </div>
    );
  }
}

Movie.propTypes = {
  movies: React.PropTypes.array,
  title: React.PropTypes.string
};

module.exports = MovieList;
