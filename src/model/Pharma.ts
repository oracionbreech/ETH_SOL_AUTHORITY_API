import mongoose, { Schema } from 'mongoose';

export interface IPharma {
  address: string;
  signedMessage: string;
  email: string;
}

const Pharma = new Schema<IPharma>({
  address: String,
  email: String,
  signedMessage: String
});

Pharma.set('timestamps', true);

export default mongoose.model<IPharma>('Pharma', Pharma);
