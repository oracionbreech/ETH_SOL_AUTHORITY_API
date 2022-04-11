import mongoose, { Schema } from 'mongoose';

export interface IWhitelisted {
  metamask: string;
  solana: string;
  twitter: string;
  ipsUsed: [];
}

const Whitelisted = new Schema<IWhitelisted>({
  metamask: String,
  solana: String,
  twitter: String,
  ipsUsed: []
});

Whitelisted.set('timestamps', true);

export default mongoose.model<IWhitelisted>('Whitelist', Whitelisted);
