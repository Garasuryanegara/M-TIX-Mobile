const express = require("express");
const router = express.Router();
const userController = require("../controllers").userController;
const { fileUploader, upload } = require("../middlewares/multer");

router.post("/", userController.insertUser);
router.post("/v1", userController.loginUser);
router.get("/v2", userController.getIdByToken, userController.getUserByToken);
router.get("/generate-token/email", userController.generateTokenByEmail);
router.patch("/v4", userController.getIdByToken, userController.changePassword);
router.patch("/edit-profile/:id", userController.editProfile);
router.post(
  "/image/v1/:id",
  fileUploader({ destinationFolder: "avatar" }).single("avatar"),
  userController.uploadAvatar
);
router.post(
  "/image/v2/:id",
  upload.single("avatar"),
  userController.uploadAvatarV2
);
router.get("image/render/:id", userController.renderAvatar);

module.exports = router;
