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

interface GetMintedNFTInfoRequest extends Request {
  params: {
    address: string;
  };
}

const getNFTMintedInfo = async (req: GetMintedNFTInfoRequest, res: Response): Promise<any> => {
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
      mintTransaction: mintTransactions.pop(),
      image: get(arweaveURIData, 'image', '')
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export default getNFTMintedInfo;
