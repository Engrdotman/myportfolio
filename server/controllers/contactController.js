import { createContact as createContactModel, getAllContacts as getAllContactsModel, getContact as getContactModel } from "../models/contactModel.js";
import { sendNotification, sendAutoReply } from "../utils/mailer.js";

export const submitContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newContact = await createContactModel(name, email, message);

    // Send both emails
    await sendNotification({ name, email, message });
    await sendAutoReply(email, name);

    res.status(201).json({ success: true, data: newContact });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export const getAllContacts = async (req, res) => {
    try {
        const contacts = await getAllContactsModel();
        res.status(200).json({ success: true, data: contacts });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    } 
};

export const getContact = async (req, res) => {
    try {
        const contact = await getContactModel(req.params.id);
        res.status(200).json({ success: true, data: contact });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    } 
};
