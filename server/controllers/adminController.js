const AdminService = require("../services/AdminService");
const getAdmin = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const admin = await AdminService.read(id, "adminID");

    if (!admin) {
      return res.status(400).send("Cannot find Admin!");
    }
    return res.status(200).json({ admin });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getAdmin,
};
