const { createContact } = require("../models/contactModel");
const { sendNotification, sendAutoReply } = require("../utils/mailer");

const submitContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newContact = await createContact(name, email, message);

    // Send both emails
    await sendNotification({ name, email, message });
    await sendAutoReply(email, name);

    res.status(201).json({ success: true, data: newContact });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};