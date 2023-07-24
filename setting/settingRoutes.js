const express = require("express");
const settingController = require("./settingController");
const router = express.Router();

router.route("/").post(settingController.addSetting).get(settingController.getAllSettings);
router.route("/:id").get(settingController.getSettingById).put(settingController.updateSetting).delete(settingController.deleteSetting);

module.exports = router;
