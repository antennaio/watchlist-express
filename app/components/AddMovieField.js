import React from 'react';
import MovieActions from '../actions/MovieActions';

var ENTER_KEY_CODE = 13;

class AddMovieField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value || ''
    }
  }

  // Updating state as the user types
  onChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  onKeyDown(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      this.saveMovie();
    }
  }

  saveMovie() {
    if (!this.state.value) return;
    MovieActions.create(this.state.value);
    this.setState({ value: '' });
  }

  render() {
    return (
      <div className="ui right action input">
        <input
          placeholder={this.props.placeholder}
          value={this.state.value}
          onChange={this.onChange.bind(this)}
          onKeyDown={this.onKeyDown.bind(this)}
          autoFocus={true}
        />
        <a className="ui teal button" onClick={this.saveMovie.bind(this)}>
          <i className="add icon"></i>
          Add
        </a>
      </div>
    );
  }
}

AddMovieField.propTypes = {
  placeholder: React.PropTypes.string
};

module.exports = AddMovieField;
