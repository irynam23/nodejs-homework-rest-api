const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const express = require("express");
const {
  addContactSchema,
  editContactSchema,
} = require("../../schemas/contact");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  res.json(contacts);
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contactById = await getContactById(contactId);
  contactById
    ? res.json(contactById)
    : res.status(404).json({ message: "Not found" });
});

router.post("/", async (req, res, next) => {
  const { value, error } = addContactSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const newContact = await addContact(value);
  res.status(201).json(newContact);
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const result = await removeContact(contactId);
  result
    ? res.json({ message: "contact deleted" })
    : res.status(404).json({ message: "Not found" });
});

router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  if (!Object.keys(req.body).length) {
    return res.status(400).json({ message: "missing fields" });
  }
  const { value, error } = editContactSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const updatedContact = await updateContact(contactId, value);
  updatedContact
    ? res.json(updatedContact)
    : res.status(404).json({ message: "Not found" });
});

module.exports = router;
