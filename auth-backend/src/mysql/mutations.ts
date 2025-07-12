export const INSERT_USER_STATEMENT = `
  INSERT INTO users (name, email, password)
    VALUES (?, ?, ?)
`;
