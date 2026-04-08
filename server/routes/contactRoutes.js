import express from "express";
const router = express.Router();

import { submitContact, getAllContacts, getContact } from "../controllers/contactController.js";

//route to get all contacts
router.get("/contact", getAllContacts);

//route to get a single contact
router.get("/contact/:id", getContact);

//route to submit contact
router.post("/contact", submitContact);

export default router;