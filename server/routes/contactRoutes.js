const express = require("express");
const router = express.Router();

const { submitContact, getAllContacts, getContact } = require("../controllers/contactController");

//route to get all contacts
router.get("/contact", getAllContacts);

//route to get a single contact
router.get("/contact/:id", getContact);

//route to submit contact
router.post("/contact", submitContact);

module.exports = router;