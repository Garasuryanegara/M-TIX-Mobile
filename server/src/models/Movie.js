module.exports = (sequelize, Sequelize) => {
  const Movie = sequelize.define("movies", {
    title: Sequelize.STRING,
    category: Sequelize.STRING,
    duration: Sequelize.STRING,
    synopsis: Sequelize.STRING,
    producer: Sequelize.STRING,
    director: Sequelize.STRING,
    director: Sequelize.STRING,
    writer: Sequelize.STRING,
    cast: Sequelize.STRING,
    distributor: Sequelize.STRING,
    poster_url: Sequelize.STRING,
    upcoming: { type: Sequelize.BOOLEAN, defaultValue: false },
  });
  return Movie;
};
