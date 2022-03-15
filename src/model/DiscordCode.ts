import mongoose, { Schema } from 'mongoose';

export interface IDiscordCode {
  code: string;
  clientId: string;
  consumed: boolean;
}

const DiscordCode = new Schema<IDiscordCode>({
  code: String,
  clientId: String,
  consumed: Boolean
});

DiscordCode.set('timestamps', true);

export default mongoose.model<IDiscordCode>('DiscordCode', DiscordCode);
