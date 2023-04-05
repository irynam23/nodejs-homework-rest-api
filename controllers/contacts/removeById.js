const { Contact } = require("../../models");

const removeById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  result
    ? res.json({ message: "contact deleted" })
    : res.status(404).json({ message: "Not found" });
};

module.exports = { removeById };
