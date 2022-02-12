import mongoose, { Schema } from 'mongoose';

export interface INFT {
  addresses: string[];
  name: string;
  candyMachineId: string;
}

const NFT = new Schema<INFT>({
  addresses: Schema.Types.Array,
  name: String,
  candyMachineId: String
});

NFT.set('timestamps', true);

export default mongoose.model<INFT>('NonFungibleTokens', NFT);
