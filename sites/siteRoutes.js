const express = require("express");
const siteController = require("./siteController");
const router = express.Router();

router.route("/").post(siteController.addSite).get(siteController.getAllSites);
router.route("/:id").get(siteController.getSiteById).put(siteController.updateSite).delete(siteController.deleteSite);

module.exports = router;
