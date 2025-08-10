import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool } from '../config/database.js';

const JWT_SECRET = process.env.JWT_SECRET || 'utkarshkumar7545';

export async function findUserByEmail(email) {
  const [users] = await pool.execute(
    'SELECT id, name, email, password, role FROM users WHERE email = ?',
    [email]
  );
  return users;
}

export async function createUser(name, email, password) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const [result] = await pool.execute(
    'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
    [name, email, hashedPassword, 'user']
  );

  return {
    id: result.insertId,
    name,
    email,
    role: 'user'
  };
}

export function generateToken(userId) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
}

export async function validatePassword(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
}
