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
  name: string;
  arweaveURI: string;
  description: string;
  image: string;
  attributes: IFlowerAttributes[];
  creators: IFlowerCreators[];
  mintTransaction: string;
}

const Flower = new Schema<IFlower>({
  name: String,
  arweaveURI: String,
  description: String,
  image: String,
  attributes: Schema.Types.Array,
  creators: Schema.Types.Array
});

Flower.set('timestamps', true);

export default mongoose.model<IFlower>('Flower', Flower);
