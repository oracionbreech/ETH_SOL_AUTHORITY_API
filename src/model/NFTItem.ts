import mongoose, { Schema } from 'mongoose';

export interface INFTAttributes {
  traitType: string;
  value: string;
}

export interface INFTItem {
  address: string;
  name: string;
  candyMachineId: string;
  projectName: string;
  symbol: string;
  uri: string;
  attributes: INFTAttributes[];
}

const NFTItem = new Schema<INFTItem>({
  address: String,
  name: String,
  candyMachineId: String,
  projectName: String,
  symbol: String,
  uri: String
});

NFTItem.set('timestamps', true);

export default mongoose.model<INFTItem>('NFTItem', NFTItem);
