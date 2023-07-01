module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define("orders", {
    order_number: Sequelize.STRING,
    quantity: Sequelize.INTEGER,
    total_amount: Sequelize.INTEGER,
  });
  return Order;
};
