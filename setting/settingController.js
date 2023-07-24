const settingService = require("./settingService");

const addSetting = async function (req, res, next) {
  try {
    const setting = await settingService.addSetting(req.body);
    res.json({ data: setting.value, message: "Ressource created" });
  } catch (err) {
    res.json({ error: err.message });
  }
};

const getAllSettings = async function (req, res, next) {
  const { search } = req.query;
  try {
    const settings = await settingService.getAllSetting(search);
    res.json({ data: settings, message: "Ressources found" });
  } catch (err) {
    res.json({ error: err.message });
  }
};

const getSettingById = async function (req, res, next) {
  try {
    const setting = await settingService.getSettingById(req.params.id);
    res.json({ data: setting, message: "Ressource found" });
  } catch (err) {
    res.json({ error: err.message });
  }
};

const updateSetting = async function (req, res, next) {
  try {
    const setting = await settingService.updateSetting(req.params.id, req.body);
    res.json({ data: setting, message: "Ressource updated" });
  } catch (err) {
    res.json({ error: err.message });
  }
};

const deleteSetting = async function (req, res, next) {
  try {
    const setting = await settingService.deleteSetting(req.params.id);
    res.json({ data: setting.value, message: "Ressource deleted" });
  } catch (err) {
    res.json({ error: err.message });
  }
};

module.exports = {
  addSetting,
  getAllSettings,
  getSettingById,
  updateSetting,
  deleteSetting,
};
