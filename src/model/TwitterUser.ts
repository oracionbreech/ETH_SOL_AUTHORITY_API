import mongoose, { Schema } from 'mongoose';

export interface ITwitterUser {
  userName: string;
  userId: string;
  userToken: string;
  userTokenSecret: string;
}

const TwitterUser = new Schema<ITwitterUser>({
  userName: String,
  userId: String,
  userToken: String,
  userTokenSecret: String
});

TwitterUser.set('timestamps', true);

export default mongoose.model<ITwitterUser>('TwitterUser', TwitterUser);
