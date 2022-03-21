import mongoose, { Schema } from 'mongoose';

export interface ITwitter {
  authToken: string;
  tokenSecret: string;
}

const Twitter = new Schema<ITwitter>({
  authToken: String,
  tokenSecret: String
});

Twitter.set('timestamps', true);

export default mongoose.model<ITwitter>('Twitter', Twitter);
