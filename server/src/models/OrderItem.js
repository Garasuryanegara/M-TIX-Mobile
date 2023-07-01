module.exports = (sequelize, Sequelize) => {
  const OrderItem = sequelize.define("orderItems", {
    ticket_price: Sequelize.INTEGER,
  });
  return OrderItem;
};
