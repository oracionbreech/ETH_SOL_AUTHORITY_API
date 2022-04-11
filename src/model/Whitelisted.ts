import mongoose, { Schema } from 'mongoose';

export interface IWhitelisted {
  metamask: string;
  solana: string;
  twitter: string;
}

const Whitelisted = new Schema<IWhitelisted>({
  metamask: String,
  solana: String,
  twitter: String
});

Whitelisted.set('timestamps', true);

export default mongoose.model<IWhitelisted>('Twitter', Whitelisted);
