const { Contact } = require("../../models");

const updateById = async (req, res) => {
  const { contactId } = req.params;
  if (!Object.keys(req.body).length) {
    return res.status(400).json({ message: "missing fields" });
  }

  const result = await Contact.findByIdAndUpdate(contactId, req.body);
  result ? res.json(result) : res.status(404).json({ message: "Not found" });
};

module.exports = { updateById };
