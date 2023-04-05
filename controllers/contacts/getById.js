const { Contact } = require("../../models");

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  result ? res.json(result) : res.status(404).json({ message: "Not found" });
};

module.exports = { getById };
