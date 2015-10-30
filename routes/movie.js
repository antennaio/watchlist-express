var express = require('express');
var router = express.Router();
var Movie = require('../models/Movie');

/* GET all movies. */
router.get('/', function(req, res, next) {
  return Movie.find(function (err, movies) {
    if (err) {
      return res.send(err.message);
    }
    
    return res.send(movies);
  });
});

/* POST movie. */
router.post('/', function(req, res, next) {
  var title = req.body.title;
  var watched = req.body.watched || false;

  var movie = new Movie({ title: title, watched: watched });

  movie.save(function(err) {
    if (err) {
      return res.send(err.message);
    }

    return res.send(movie);
  });
});

/* Change status (watched/unwatched) of a movie. */
router.post('/:id/watched', function(req, res, next) {
  var id = req.params.id;

  Movie.findById(id, function(err, movie) {
    if (err) {
      return res.send(err.message);
    }

    if (movie) {
      movie.watched = !movie.watched;
      movie.save();

      return res.send(movie);
    }

    return res.send('Movie not found');
  });
});

/* DELETE a movie. */
router.delete('/:id', function(req, res, next) {
  var id = req.params.id;

  Movie.findByIdAndRemove(id, null, function(err, movie) {
    if (err) {
      return res.send(err.message);
    }

    if (movie) {
      return res.send(movie);
    }

    return res.send('Movie not found');
  });
});

module.exports = router;
