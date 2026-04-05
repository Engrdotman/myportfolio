const pool = require("../db/db");

// Function to insert a contact message
const createContact = async (name, email, message) => {
  const result = await pool.query(
    `INSERT INTO contacts (name, email, message) VALUES ($1, $2, $3) RETURNING *`,
    [name, email, message]
  );
  return result.rows[0];
};


//function to get all contacts
const getAllContacts = async () => {
  const result = await pool.query(`SELECT * FROM contacts`);
  return result.rows;
};

//function to get a single contact
const getContact = async (id) => {
  const result = await pool.query(`SELECT * FROM contacts WHERE id = $1`, [id]);
  return result.rows[0];
};

module.exports = { createContact, getAllContacts, getContact };
