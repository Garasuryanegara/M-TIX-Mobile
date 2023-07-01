module.exports = (sequelize, Sequelize) => {
  const Schedule = sequelize.define("schedules", {
    showtime: Sequelize.DATE,
    ticket_price: Sequelize.INTEGER,
    studio: Sequelize.ENUM("1", "2", "3", "4"),
  });
  return Schedule;
};
