import { PublicKey } from '@solana/web3.js';
import axios from 'axios';
import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import { get, isEmpty } from 'lodash';
import { SOLANA_RPC_CONNECTION } from '../../constants/connection';
import { IFlowerAttributes } from '../../model/flower';
import { decodeMetadata, getMetadataKey } from '../../utils/get-meta';

// Utilities
import { getMintAddresses } from '../../utils/get-mints-v2';
import { toPublicKey } from '../../utils/toPublicKey';

interface RequestAllFlowersV2 extends Request {
  params: {
    candyMachineId: string;
  };
}

const getAllFlowersV2 = async (req: RequestAllFlowersV2, res: Response): Promise<any> => {
  try {
    const { candyMachineId } = req.params;

    const mintedAddresses = await getMintAddresses(candyMachineId);

    const mintedEntries = await Promise.all(
      mintedAddresses.map(async (mintedAddress) => {
        const metadataKey = await getMetadataKey(mintedAddress);
        const metadataInfo = await SOLANA_RPC_CONNECTION.getAccountInfo(toPublicKey(metadataKey));

        const mintTransactions = await SOLANA_RPC_CONNECTION.getSignaturesForAddress(
          new PublicKey(decodeMetadata(metadataInfo.data).mint)
        );

        const decodedMetadata = decodeMetadata(metadataInfo.data);

        return {
          address: mintedAddress,
          ...decodedMetadata,
          mintTransaction: mintTransactions.pop()
        };
      })
    );

    const cleanedEntries = mintedEntries.filter(
      (mint) =>
        String(mint.data.uri).replaceAll('\x00', '') !== 'null' &&
        !isEmpty(String(mint.data.uri).replaceAll('\x00', ''))
    );

    const cleanedEntiesWithAttributes = await Promise.all(
      cleanedEntries.map(async (data) => {
        const { data: arweaveURIData } = await axios.get(data.data.uri);

        const attributes: IFlowerAttributes[] = [...get(arweaveURIData, 'attributes', [])].map(
          (data): IFlowerAttributes => ({
            traitType: get(data, 'trait_type', ''),
            value: get(data, 'value', '')
          })
        );
        return {
          ...data,
          attributes
        };
      })
    );

    return res.status(StatusCodes.OK).json(cleanedEntiesWithAttributes);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export default getAllFlowersV2;
