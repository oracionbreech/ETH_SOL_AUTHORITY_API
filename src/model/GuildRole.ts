import mongoose, { Schema } from 'mongoose';
import { IDiscordApp } from './DiscordApp';

export interface IGuildRole {
  name: string;
  roleId: string;
  appId: IDiscordApp | any;
}

const GuildRole = new Schema<IGuildRole>({
  name: String,
  roleId: String,
  appId: {
    type: String,
    ref: 'DiscordApp'
  }
});

GuildRole.set('timestamps', true);

export default mongoose.model<IGuildRole>('GuildRole', GuildRole);
