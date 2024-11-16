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
    res.status(200).json({ message: "Created flavor" });
  } catch (e) {}
};

module.exports = {
  createFlavor,
};
