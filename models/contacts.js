// const fs = require('fs/promises')
const fs = require("fs").promises;
const path = require("node:path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "/contacts.json");

const listContacts = async () => {
  try {
    const contacts = (await fs.readFile(contactsPath)).toString();
    const parseContacts = JSON.parse(contacts);
    return parseContacts;
  } catch (error) {
    console.error(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = (await fs.readFile(contactsPath)).toString();
    const parseContacts = JSON.parse(contacts);
    const contactById = parseContacts.find(
      (contact) => contact.id === contactId
    );
    if (!contactById) {
      return null;
    }
    return contactById;
  } catch (error) {
    console.error(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = (await fs.readFile(contactsPath)).toString();
    const parseContacts = JSON.parse(contacts);
    const requestedContact = parseContacts.find(
      (contact) => contact.id === contactId
    );
    if (!requestedContact) {
      return false;
    }
    const newContacts = parseContacts.filter(
      (contact) => contact.id !== contactId
    );
    fs.writeFile(contactsPath, JSON.stringify(newContacts));
    return true;
  } catch (error) {
    console.error(error);
  }
};

const addContact = async (body) => {
  try {
    const contacts = (await fs.readFile(contactsPath)).toString();
    const parseContacts = JSON.parse(contacts);
    const newContact = { ...body, id: v4() };
    parseContacts.push(newContact);
    fs.writeFile(contactsPath, JSON.stringify(parseContacts));
    return newContact;
  } catch (error) {
    console.error(error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = (await fs.readFile(contactsPath)).toString();
    const parseContacts = JSON.parse(contacts);
    const requestedContact = parseContacts.find(
      (contact) => contact.id === contactId
    );
    if (!requestedContact) {
      return null;
    }
    const updatedContacts = parseContacts.map((contact) => {
      if (contact.id === contactId) {
        return { ...contact, ...body };
      }
      return contact;
    });
    fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
    return updatedContacts.find((contact) => contact.id === contactId);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
