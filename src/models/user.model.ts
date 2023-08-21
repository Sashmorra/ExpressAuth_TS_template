import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, require: true },
  hashPassword: { type: String, require: true },
});
export const userModel = mongoose.model('User', userSchema);
