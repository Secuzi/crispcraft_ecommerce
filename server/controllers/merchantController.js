const MerchantService = require("../services/MerchantService");
const merchantSchema = require("../schemas/MerchantSchema");

//@PATH: /merchant
const getAllMerchants = async (req, res) => {
  try {
    const merchants = await MerchantService.getAll();
    res.send({ merchants });
  } catch (e) {
    console.log(e);
  }
};

const createMerchant = async (req, res) => {
  try {
    const { fName, lName, phoneNumber, telNumber, email } = req.body;
    const { error, value: validatedMerchant } = merchantSchema.validate(
      {
        fName,
        lName,
        phoneNumber,
        telNumber,
        email,
      },
      { abortEarly: false }
    );

    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);

      console.log(errorMessages);
      return res.status(400).json({ message: errorMessages });
    }
    const createdMerchant = await MerchantService.create(validatedMerchant);
    return res.status(200).json({
      message: "Created Merchant!",
      merchantID: createdMerchant.id,
    });
  } catch (e) {
    console.log(e);
  }
};

const getMerchant = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const merchant = await MerchantService.read(id, "merchantID");

    if (!merchant) {
      return res.status(400).send("Cannot find Merchant!");
    }
    return res.status(200).json({ merchant });
  } catch (e) {
    console.log(e);
  }
};

const updateMerchant = async (req, res) => {
  const { id } = req.params;

  const { fName, lName, phoneNumber, telNumber, email } = req.body;
  const { error, value: validatedMerchant } = merchantSchema.validate(
    {
      fName,
      lName,
      phoneNumber,
      telNumber,
      email,
    },
    { abortEarly: false }
  );

  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);

    console.log(errorMessages);
    return res.status(400).json({ message: errorMessages });
  }
  const updatedMerchant = await MerchantService.update(
    id,
    validatedMerchant,
    "merchantID"
  );
  return res
    .status(200)
    .json({ message: "Updated successfully!", updatedMerchant });
};

module.exports = {
  getAllMerchants,
  createMerchant,
  getMerchant,
  updateMerchant,
};
