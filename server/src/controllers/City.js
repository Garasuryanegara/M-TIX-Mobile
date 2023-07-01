const db = require("../models");

const cityController = {
  getAllCity: async (req, res) => {
    try {
      const result = await db.City.findAll();
      // console.log(result);
      return res.send(result);
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  },
};

module.exports = cityController;
