import mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  { timestamps: true },
);

export interface User extends mongoose.Document {
  id: string;
  username: string;
  password: string;
}
