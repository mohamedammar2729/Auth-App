// create specific queries for MySQL database

export const GET_USER_BY_ID = `SELECT * FROM users WHERE id = ?`;

export const GET_USER_BY_EMAIL = `SELECT * FROM users WHERE email = ?`;