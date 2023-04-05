const express = require("express");

const { validation, ctrlWrapper } = require("../../middlewares");
const {
  addContactSchema,
  updateContactSchema,
  updateStatusContactSchema,
} = require("../../models/contact");
const { contacts: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", ctrlWrapper(ctrl.getById));

router.post("/", validation(addContactSchema), ctrlWrapper(ctrl.add));

router.delete("/:contactId", ctrlWrapper(ctrl.removeById));

router.put(
  "/:contactId",
  validation(updateContactSchema),
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  "/:contactId/favorite",
  validation(updateStatusContactSchema),
  ctrlWrapper(ctrl.updateStatus)
);

module.exports = router;
