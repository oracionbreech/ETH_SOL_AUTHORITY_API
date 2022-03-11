import mongoose, { Schema } from 'mongoose';

export interface IUser {
  username: string;
  email: string;
  password: string;
}

const User = new Schema<IUser>({
  username: String,
  email: String,
  password: String
});

User.set('timestamps', true);

export default mongoose.model<IUser>('Users', User);
