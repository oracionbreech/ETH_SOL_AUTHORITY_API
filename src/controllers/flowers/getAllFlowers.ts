import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';

import { Connection, clusterApiUrl, PublicKey } from '@solana/web3.js';
import bs58 from 'bs58';

const getAllFlowers = async (req: Request, res: Response): Promise<any> => {
  try {
    const connection = new Connection('https://api.mainnet-beta.solana.com');
    const MAX_NAME_LENGTH = 32;
    const MAX_URI_LENGTH = 200;
    const MAX_SYMBOL_LENGTH = 10;
    const MAX_CREATOR_LEN = 32 + 1 + 1;
    const MAX_CREATOR_LIMIT = 5;
    const MAX_DATA_SIZE =
      4 +
      MAX_NAME_LENGTH +
      4 +
      MAX_SYMBOL_LENGTH +
      4 +
      MAX_URI_LENGTH +
      2 +
      1 +
      4 +
      MAX_CREATOR_LIMIT * MAX_CREATOR_LEN;
    const MAX_METADATA_LEN = 1 + 32 + 32 + MAX_DATA_SIZE + 1 + 1 + 9 + 172;
    const CREATOR_ARRAY_START =
      1 + 32 + 32 + 4 + MAX_NAME_LENGTH + 4 + MAX_URI_LENGTH + 4 + MAX_SYMBOL_LENGTH + 2 + 1 + 4;

    const TOKEN_METADATA_PROGRAM = new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s');
    const CANDY_MACHINE_V2_PROGRAM = new PublicKey('cndy3Z4yapfJBmL3ShUp5exZKqR3z33thTzeNMm2gRZ');
    const candyMachineId = new PublicKey('3qt9aBBmTSMxyzFEcwzZnFeV4tCZzPkTYVqPP7Bw5zUh');

    const getMintAddresses = async (firstCreatorAddress: PublicKey) => {
      const metadataAccounts = await connection.getProgramAccounts(TOKEN_METADATA_PROGRAM);

      return metadataAccounts.map((metadataAccountInfo) => bs58.encode(metadataAccountInfo.account.data));
    };

    const getCandyMachineCreator = async (candyMachine: PublicKey): Promise<[PublicKey, number]> =>
      PublicKey.findProgramAddress([Buffer.from('candy_machine'), candyMachine.toBuffer()], CANDY_MACHINE_V2_PROGRAM);

    const candyMachineCreator = await getCandyMachineCreator(candyMachineId);

    await getMintAddresses(candyMachineCreator[0]);

    return res.status(StatusCodes.OK).json([]);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export default getAllFlowers;
