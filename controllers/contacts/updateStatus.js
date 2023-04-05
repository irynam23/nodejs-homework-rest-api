const { Contact } = require("../../models");

const updateStatus = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  if (!Object.keys(req.body).length) {
    return res.status(400).json({ message: "missing fields" });
  }

  const result = await Contact.findByIdAndUpdate(contactId, { favorite });
  result ? res.json(result) : res.status(404).json({ message: "Not found" });
};

module.exports = { updateStatus };
