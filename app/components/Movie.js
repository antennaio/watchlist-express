import React from 'react';
import MovieActions from '../actions/MovieActions';

class Movie extends React.Component {
  toggleWatched() {
    MovieActions.toggleWatched(this.props.movie._id, !this.props.movie.watched);
  }

  destroy() {
    MovieActions.destroy(this.props.movie._id);
  }

  render() {
    return (
      <div className="item">
        <div className="middle aligned content">
          {this.props.movie.title}
        </div>
        <div className="middle aligned content">
          <button className="tiny ui right floated red button" onClick={this.destroy.bind(this)}>
            Delete
          </button>
          <button className="tiny ui right floated teal button" onClick={this.toggleWatched.bind(this)}>
            {this.props.movie.watched ? 'Unwatch' : 'Watched'}
          </button>
        </div>
      </div>
    );
  }
}

Movie.propTypes = {
  movie: React.PropTypes.object.isRequired
};

module.exports = Movie;
