const pool = require("../config/db");

const findUserByEmail = async (email) => {
  const [rows] = await pool.query(
    `
      SELECT id, name, username, email, password
      FROM users
      WHERE email = ?
      LIMIT 1
    `,
    [email]
  );

  return rows[0] || null;
};

const findUserByUsername = async (username) => {
  const [rows] = await pool.query(
    `
      SELECT id, name, username, email
      FROM users
      WHERE username = ?
      LIMIT 1
    `,
    [username]
  );

  return rows[0] || null;
};

const createUser = async ({
  name,
  username,
  email,
  hashedPassword
}) => {
  const [result] = await pool.query(
    `
      INSERT INTO users
      (name, username, email, password)
      VALUES (?, ?, ?, ?)
    `,
    [name, username, email, hashedPassword]
  );

  return {
    id: result.insertId,
    name,
    username,
    email
  };
};

module.exports = {
  findUserByEmail,
  findUserByUsername,
  createUser
};