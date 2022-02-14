import mongoose, { Schema } from 'mongoose';

export interface INFTItemMetadataAttributes {
  traitType: string;
  value: string;
}

export interface INFTItemMetadataCreators {
  address: string;
  share: number;
}

export interface INFTItemMetadata {
  address: string;
  name: string;
  arweaveURI: string;
  description: string;
  image: string;
  attributes: INFTItemMetadataAttributes[];
  creators: INFTItemMetadataCreators[];
  mintTransaction: string;
}

const NFTItemMetadata = new Schema<INFTItemMetadata>({
  address: String,
  name: String,
  arweaveURI: String,
  description: String,
  image: String,
  attributes: Schema.Types.Array,
  creators: Schema.Types.Array,
  mintTransaction: String
});

NFTItemMetadata.set('timestamps', true);

export default mongoose.model<INFTItemMetadata>('NFTItemMetadata', NFTItemMetadata);
