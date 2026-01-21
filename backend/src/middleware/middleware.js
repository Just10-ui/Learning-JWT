import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const parseJson = express.json();
export const crossOrig = cors({origin: 'http://127.0.0.1:5500'});
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({message: 'No token provided'});
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({message: 'Invalid token'});
  }
};