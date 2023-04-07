const { Contact } = require("../../models");

const getAll = async (req, res) => {
  const { id } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner: id }, "", {
    skip,
    limit: Number(limit),
  }).populate("owner", "id, name, email");
  res.status(200).json(result);
};

module.exports = { getAll };
