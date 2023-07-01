module.exports = (sequelize, Sequelize) => {
  const Theater = sequelize.define("theaters", {
    name: Sequelize.STRING,
    address: Sequelize.STRING,
  });
  return Theater;
};
