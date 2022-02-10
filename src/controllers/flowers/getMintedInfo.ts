import { PublicKey } from '@solana/web3.js';
import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import { SOLANA_RPC_CONNECTION } from '../../constants/connection';
import { decodeMetadata, getMetadataKey } from '../../utils/get-meta';

// Utilities
import { toPublicKey } from '../../utils/toPublicKey';

interface IRequestGetAllFlowersV2 extends Request {
  params: {
    address: string;
  };
}

const getMintedInfo = async (req: IRequestGetAllFlowersV2, res: Response): Promise<any> => {
  try {
    const { address } = req.params;

    const metadataKey = await getMetadataKey(address);
    const metadataInfo = await SOLANA_RPC_CONNECTION.getAccountInfo(toPublicKey(metadataKey));

    const mintTransactions = await SOLANA_RPC_CONNECTION.getSignaturesForAddress(
      new PublicKey(decodeMetadata(metadataInfo.data).mint)
    );

    return res.status(StatusCodes.OK).json({
      ...decodeMetadata(metadataInfo.data),
      mintTransaction: mintTransactions.pop()
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export default getMintedInfo;
