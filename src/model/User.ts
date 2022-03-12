import mongoose, { Schema } from 'mongoose';

export interface IUser {
  username: string;
  email: string;
  password: string;
  isActive: boolean;
}

const User = new Schema<IUser>({
  username: String,
  email: String,
  password: String,
  isActive: {
    default: false,
    type: Boolean
  }
});

User.set('timestamps', true);

export default mongoose.model<IUser>('Users', User);
