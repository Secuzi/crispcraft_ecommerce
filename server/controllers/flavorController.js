const FlavorService = require("../services/FlavorService");

const createFlavor = async (req, res) => {
  try {
    const { flavorName } = req.body;
    if (!flavorName) {
      return res.status(400).json({ message: "Field is empty!" });
    }
    //Check for duplicate flavors
    const searchedFlavor = await FlavorService.getByField(
      "flavorName",
      flavorName
    );
    if (searchedFlavor) {
      return res.status(400).json({ message: "Flavor already exist!" });
    }

    const newFlavor = await FlavorService.create({ flavorName });

    res.status(200).json({ message: "Created flavor", flavorID: newFlavor.id });
  } catch (e) {
    console.log(e);
  }
};

const getAllFlavors = async (req, res) => {
  try {
    const flavors = await FlavorService.getAll();
    res.send({ flavors });
  } catch (e) {
    console.log(e);
  }
};
const getFlavor = async (req, res) => {
  const id = Number(req.params.id);
  const flavor = await FlavorService.read(id, "flavorID");

  if (!flavor) {
    return res.status(400).send("Cannot find Flavor");
  }
  return res.status(200).json({ flavor });
};

module.exports = {
  createFlavor,
  getAllFlavors,
  getFlavor,
};
