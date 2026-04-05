const express = require("express");
const router = express.Router();
const { submitContact } = require("../controllers/contactController");

router.post("/contact", submitContact);

//route to get all contacts
router.get("/contacts", getAllContacts);

//route to get a single contact
router.get("/contacts/:id", getContact);

module.exports = router;