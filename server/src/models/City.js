module.exports = (sequelize, Sequelize) => {
  const City = sequelize.define("cities", {
    name: Sequelize.STRING,
  });
  return City;
};
