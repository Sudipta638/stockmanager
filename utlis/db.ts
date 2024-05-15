import mongoose from 'mongoose';
import { CreateUserParams } from '@/types';
import User from './models/user.model';

const MONGODB_URI = process.env.MONGODB_URI;

let cached = (global as any).mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;

  if(!MONGODB_URI) throw new Error('MONGODB_URI is missing');

  cached.promise = cached.promise || mongoose.connect(MONGODB_URI, {
    dbName: 'stockmanager',
    bufferCommands: false,
  })

  cached.conn = await cached.promise;
  console.log('Connected to MongoDB')

  return cached.conn;
}
