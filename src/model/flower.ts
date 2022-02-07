import mongoose, { Schema } from 'mongoose';

export interface IFlower {
  name: string;
  arweaveURI: string;
}

const Flower = new Schema<IFlower>({
  name: String,
  arweaveURI: String
});

Flower.set('timestamps', true);

export default mongoose.model<IFlower>('Flower', Flower);
