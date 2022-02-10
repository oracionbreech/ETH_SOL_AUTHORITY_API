import { PublicKey } from '@solana/web3.js';
import bs58 from 'bs58';
import { SOLANA_RPC_CONNECTION } from '../constants/connection';

const TOKEN_METADATA_PROGRAM = new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s');

export const getMintAddresses = async (creatorId: string) => {
  const metadataAccounts = await SOLANA_RPC_CONNECTION.getProgramAccounts(TOKEN_METADATA_PROGRAM, {
    // The mint address is located at byte 33 and lasts for 32 bytes.
    dataSlice: { offset: 33, length: 32 },

    filters: [
      {
        memcmp: {
          offset: 326,
          bytes: creatorId
        }
      },
      {
        memcmp: {
          offset: 358, // first creator verified position
          bytes: '2' // 1 as base58 string
        }
      }
    ]
  });

  return metadataAccounts.map((metadataAccountInfo) => bs58.encode(metadataAccountInfo.account.data));
};
