const express = require("express");
const router = express.Router();
const movieController = require("../controllers").movieController;

router.get("/v1", movieController.getAllMovie);
router.get("/v1/upcoming", movieController.getAllMovieUpcoming);
router.get("/:id", movieController.getMovieById);

module.exports = router;
