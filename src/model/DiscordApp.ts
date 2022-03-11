import mongoose, { Schema } from 'mongoose';

export interface IDiscordApp {
  name: string;
  secretKey: string;
  clientId: string;
  userId: string;
}

const DiscordApp = new Schema<IDiscordApp>({
  name: String,
  secretKey: String,
  clientId: String,
  userId: String
});

DiscordApp.set('timestamps', true);

export default mongoose.model<IDiscordApp>('DiscordApp', DiscordApp);
