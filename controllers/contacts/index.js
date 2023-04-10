const { add } = require("./add");

const { removeById } = require("./removeById");

const { updateById } = require("./updateById");

const { getAll } = require("./getAll");

const { getById } = require("./getById");

const { updateStatus } = require("./updateStatus");

const { verifyEmail } = require("../users/verifyEmail");

module.exports = {
  add,
  removeById,
  updateById,
  getAll,
  getById,
  updateStatus,
  verifyEmail,
};
