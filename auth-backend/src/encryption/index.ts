// we have one key which is used to encrypt and decrypt the tokens
// Key => 32 Bytes Base64 -> convert to Buffer
// IV (Initialization Vector) => 16 Bytes Base64 -> convert to Buffer
// used for AES encryption (Advanced Encryption Standard) is a symmetric encryption algorithm
// key stored in .env file, but IV is generated randomly for each encryption
// IV is generated inside the buffer, but Key is Base64 then converted to Buffer

import crypto from 'crypto';
import { config } from 'dotenv';
config(); // Load environment variables from .env file

const algorithm = 'aes-256-cbc'; // AES-256-CBC is a symmetric encryption algorithm
const key = Buffer.from(process.env.ENCRYPTION_KEY!, 'base64');
const iv = crypto.randomBytes(16); // 16 bytes IV for AES-256-CBC

export const encryptData = (data: string) => {
  // declare cipher which is converting the plantext to ciphertext
  // readable text is converted to unreadable text
  const cipher = crypto.createCipheriv(
    algorithm,
    key, // 32 bytes key
    iv // 16 bytes IV
  );
  let encrypted = cipher.update(data, 'utf8', 'hex'); // convert from utf8 to hex
  encrypted += cipher.final('hex'); // finalize the encryption

  return encrypted;
};

export const decryptData = (encrypted: string) => {
  // declare decipher which is converting the ciphertext to plaintext
  // unreadable text is converted to readable text
  const decipher = crypto.createDecipheriv(
    algorithm,
    key, // 32 bytes key
    iv // 16 bytes IV
  );
  let decrypted = decipher.update(encrypted, 'hex', 'utf8'); // convert from hex to utf8
  decrypted += decipher.final('utf8'); // finalize the decryption

  return decrypted;
};
