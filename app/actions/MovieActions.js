import alt from '../alt';
import reqwest from 'reqwest';

class MovieActions {
  constructor() {
    /*
     * generateActions() saves us from typing a lot of boilerplate:
     *
     * getMoviesSuccess(resp) {
     *   this.dispatch(resp);
     * }
     * 
     * getMoviesFail(err) {
     *   this.dispatch(err);
     * }
     */
    this.generateActions(
      'getMoviesSuccess',
      'getMoviesFail',
      'toggleWatchedSuccess',
      'toggleWatchedFail',
      'createSuccess',
      'createFail',
      'destroySuccess',
      'destroyFail'
    );
  }

  getMovies() {
    let actions = this.actions;

    reqwest({
      url: '/movie',
      type: 'json',
      method: 'get',
      error: (err) => {
        actions.getMoviesFail(err);
      },
      success: (resp) => {
        actions.getMoviesSuccess(resp);
      }
    });
  }

  toggleWatched(id, state) {
    let actions = this.actions;

    reqwest({
      url: '/movie/' + id + '/watched',
      type: 'json',
      method: 'post',
      data: { watched: state },
      error: (err) => {
        actions.toggleWatchedFail(err);
      },
      success: (resp) => {
        actions.toggleWatchedSuccess(resp);
      }
    });
  }

  create(title) {
    let actions = this.actions;

    reqwest({
      url: '/movie',
      type: 'json',
      method: 'post',
      data: { title: title },
      error: (err) => {
        actions.createFail(err);
      },
      success: (resp) => {
        actions.createSuccess(resp);
      }
    });
  }

  destroy(id) {
    let actions = this.actions;

    reqwest({
      url: '/movie/' + id,
      type: 'json',
      method: 'delete',
      error: (err) => {
        actions.destroyFail(err);
      },
      success: (resp) => {
        actions.destroySuccess(resp);
      }
    });
  }
}

module.exports = alt.createActions(MovieActions);
