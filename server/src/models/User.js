module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "users",
    {
      email: Sequelize.STRING,
      password: Sequelize.STRING,
      fullname: Sequelize.STRING,
      phone: Sequelize.STRING,
      address: Sequelize.STRING,
      avatar_url: Sequelize.STRING,
      avatar_blob: Sequelize.BLOB("long"),
    },
    {
      paranoid: true,
    }
  );
  return User;
};
