import mongoose, { Schema, Types } from 'mongoose';

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
  ipsUsed: Types.Array
});

Whitelisted.set('timestamps', true);

export default mongoose.model<IWhitelisted>('Whitelist', Whitelisted);
