"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

const User = require("./User");
const Movie = require("./Movie");
const City = require("./City");
const Theater = require("./Theater");
const Ticket = require("./Ticket");
const Schedule = require("./Schedule");
const Order = require("./Order");
const Token = require("./Token");
const OrderItem = require("./OrderItem");

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = User(sequelize, Sequelize);
db.Movie = Movie(sequelize, Sequelize);
db.City = City(sequelize, Sequelize);
db.Theater = Theater(sequelize, Sequelize);
db.Ticket = Ticket(sequelize, Sequelize);
db.Schedule = Schedule(sequelize, Sequelize);
db.Order = Order(sequelize, Sequelize);
db.Token = Token(sequelize, Sequelize);
db.OrderItem = OrderItem(sequelize, Sequelize);

module.exports = db;

//satu order punya banyak orderitem
// orderitem punya order_id
db.OrderItem.belongsTo(db.Order, {
  foreignKey: "order_id",
  as: "Order",
});

// satu city punya banyak theaters
// theater punya city_id
db.Theater.belongsTo(db.City, {
  foreignKey: "city_id",
  as: "City",
});

// satu theater bisa banyak schedule
//schedule punya theater_id
db.Schedule.belongsTo(db.Theater, {
  foreignKey: "theater_id",
  as: "Theater",
});

// satu movie bisa banyak schedule
// schedule punya movie_id
db.Schedule.belongsTo(db.Movie, {
  foreignKey: "movie_id",
  as: "Movie",
});

// satu user bisa banyak order
//order punya user_id
db.Order.belongsTo(db.User, {
  foreignKey: "user_id",
  as: "User",
});

// satu orderItem hanya ada satu ticket
//orderItem punya ticket_id
db.OrderItem.belongsTo(db.Ticket, {
  foreignKey: "ticket_id",
});

// satu schedule bisa banyak ticket
// ticket punya schedule_id
db.Ticket.belongsTo(db.Schedule, {
  foreignKey: "schedule_id",
  as: "Schedule",
});
