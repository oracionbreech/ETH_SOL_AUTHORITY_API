import mongoose, { Schema } from 'mongoose';

export interface IAuction {
  owner: string;
  auction_id: string;
  nft_mint: string;
  token_mint: string;
  auctionTitle: string;
  floor: string;
  increment: string;
  biddercap: string;
  startTime: string;
  endTime: string;
  amount: string;
}

const Auction = new Schema<IAuction>({
  owner: String,
  nft_mint: String,
  token_mint: String,
  auctionTitle: String,
  floor: String,
  increment: String,
  biddercap: String,
  startTime: String,
  endTime: String,
  amount: String,
  auction_id: String
});

Auction.set('timestamps', true);
Auction.set('autoIndex', true);

export default mongoose.model<IAuction>('Auction ', Auction);
