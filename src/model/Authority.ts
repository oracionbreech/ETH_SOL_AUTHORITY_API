import mongoose, { Schema } from 'mongoose';

export interface IAuthority {
  twitterEnabled: boolean;
  metamaskEnabled: boolean;
  discordEnabled: boolean;
  solanaEnabled: boolean;
  ethBalance: number;
  solBalance: number;
}

const Authority = new Schema<IAuthority>({
  discordEnabled: Boolean,
  metamaskEnabled: Boolean,
  solanaEnabled: Boolean,
  twitterEnabled: Boolean,
  ethBalance: Number,
  solBalance: Number
});

Authority.set('timestamps', true);
Authority.set('autoIndex', true);

export default mongoose.model<IAuthority>('Authority ', Authority);
