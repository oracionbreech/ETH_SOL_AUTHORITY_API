import { PublicKey } from '@solana/web3.js';
import axios from 'axios';
import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import { get } from 'lodash';

// Constants
import { SOLANA_RPC_CONNECTION } from '../../constants/connection';

// Model
import { INFTItemMetadataAttributes } from '../../model/NFTItemMetadata';

// Utilities
import { decodeMetadata, getMetadataKey } from '../../utils/get-meta';
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

    const decodedMetadata = decodeMetadata(metadataInfo.data);

    const { data: arweaveURIData } = await axios.get(decodedMetadata.data.uri);

    const attributes: INFTItemMetadataAttributes[] = [...get(arweaveURIData, 'attributes', [])].map(
      (data): INFTItemMetadataAttributes => ({
        traitType: get(data, 'trait_type', ''),
        value: get(data, 'value', '')
      })
    );

    return res.status(StatusCodes.OK).json({
      ...decodedMetadata,
      attributes,
      mintTransaction: mintTransactions.pop()
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export default getMintedInfo;
