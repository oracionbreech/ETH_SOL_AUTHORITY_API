import mongoose, { Schema } from 'mongoose';

export interface IFlowerAttributes {
  traitType: string;
  value: string;
}

export interface IFlowerCreators {
  address: string;
  share: number;
}

export interface IFlower {
  address: string;
  name: string;
  arweaveURI: string;
  description: string;
  image: string;
  attributes: IFlowerAttributes[];
  creators: IFlowerCreators[];
  mintTransaction: string;
}

const Flower = new Schema<IFlower>({
  address: {
    type: String,
    unique: true
  },
  name: String,
  arweaveURI: String,
  description: String,
  image: String,
  attributes: Schema.Types.Array,
  creators: Schema.Types.Array,
  mintTransaction: String
});

Flower.set('timestamps', true);

export default mongoose.model<IFlower>('Flower', Flower);
