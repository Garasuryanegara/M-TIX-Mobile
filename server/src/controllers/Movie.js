const db = require("../models");

const movieController = {
  // get movie di homePage
  getAllMovie: async (req, res) => {
    try {
      const result = await db.Movie.findAll({
        where: {
          upcoming: 0,
        },
      });
      console.log("result", result);
      return res.send(result);
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  },
  // get movie by id untuk masuk ke movie detail
  getMovieById: async (req, res) => {
    try {
      const movie = await db.Movie.findOne({
        where: {
          id: req.params.id,
        },
      });
      res.send(movie);
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  },
  // get upcoming movie
  getAllMovieUpcoming: async (req, res) => {
    try {
      const result = await db.Movie.findAll({
        where: {
          upcoming: 1,
        },
      });
      console.log("result", result);
      return res.send(result);
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  },
};

module.exports = movieController;
