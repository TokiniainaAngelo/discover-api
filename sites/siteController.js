const siteService = require("./siteService");

const addSite = async function (req, res, next) {
  try {
    const site = await siteService.addSite(req.body);
    res.json({ data: site.value, message: "Ressource created" });
  } catch (err) {
    res.json({ error: err.message });
  }
};

const getAllSites = async function (req, res, next) {
  const { search } = req.query;
  try {
    const sites = await siteService.getAllSite(search);
    res.json({ data: sites, message: "Ressources found" });
  } catch (err) {
    res.json({ error: err.message });
  }
};

const getSiteById = async function (req, res, next) {
  try {
    const site = await siteService.getSiteById(req.params.id);
    res.json({ data: site, message: "Ressource found" });
  } catch (err) {
    res.json({ error: err.message });
  }
};

const updateSite = async function (req, res, next) {
  try {
    const site = await siteService.updateSite(req.params.id, req.body);
    res.json({ data: site, message: "Ressource updated" });
  } catch (err) {
    res.json({ error: err.message });
  }
};

const deleteSite = async function (req, res, next) {
  try {
    const site = await siteService.deleteSite(req.params.id);
    res.json({ data: site.value, message: "Ressource deleted" });
  } catch (err) {
    res.json({ error: err.message });
  }
};

module.exports = {
  addSite,
  getAllSites,
  getSiteById,
  updateSite,
  deleteSite,
};
