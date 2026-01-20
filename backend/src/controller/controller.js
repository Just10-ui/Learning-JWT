import pool from '../database/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);
  const avatar = 'default-1.png';

  try {
    const checkUser = await pool.query('SELECT email, username FROM users WHERE email = $1 OR username = $2;', [email, username]);

    if (checkUser.rows.length > 0) {
      const existing = checkUser.rows[0];

      if (existing.email === email) {
        return res.status(409).json({message: 'Email already in used'});
      }

      if (existing.username === username) {
        return res.status(409).json({message: 'Username already in used'});
      }
    }

    const result = await pool.query('INSERT INTO users (username, email, password, profile) VALUES ($1, $2, $3, $4) RETURNING *;', [username, email, hashPassword, avatar]);
    const token = jwt.sign(
      {userId: result.rows[0].id, email: result.rows[0].email},
      process.env.SECRET_TOKEN,
      {expiresIn: '1h'}
    );

    res.status(201).json({message: 'Signup successful', token});
  } catch (error) {
    console.log(error);
    res.status(500).json({message: 'Server error'});
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1;', [email]);
    const users = result.rows[0];
    if (result.rows.length === 0) {
      return res.status(409).json({message: 'Invalid email or password'});
    }

    const isMatch = await bcrypt.compare(password, users.password);
    if(!isMatch) {
      return res.status(409).json({message: 'Invalid email or password'});
    }

    const token = jwt.sign(
      {userId: result.rows[0].id, email: result.rows[0].email},
      process.env.SECRET_TOKEN,
      {expiresIn: '1h'}
    );

    res.status(200).json({message: 'Login successfully', token})
  } catch (error) {
    console.log(error);
    res.status(500).json({message: 'Server error'});
  }
};