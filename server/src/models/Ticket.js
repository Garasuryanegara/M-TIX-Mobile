module.exports = (sequelize, Sequelize) => {
  const Ticket = sequelize.define("tickets", {
    seat: Sequelize.STRING,
    available: Sequelize.BOOLEAN,
  });
  return Ticket;
};
