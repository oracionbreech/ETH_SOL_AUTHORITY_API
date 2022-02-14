import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import { SOLANA_RPC_CONNECTION } from '../../constants/connection';

// Models
import NFT from '../../model/NFT';

// Utilities
import { getMintAddresses } from '../../utils/get-mints-v2';
import { toPublicKey } from '../../utils/toPublicKey';
import { decodeMetadata, getMetadataKey } from '../../utils/get-meta';
import NFTItem from '../../model/NFTItem';

interface RequestAllFlowersV2 extends Request {
  body: {
    candyMachineId: string;
    projectName: string;
  };
}

const sourceNFT = async (req: RequestAllFlowersV2, res: Response): Promise<any> => {
  try {
    const { candyMachineId, projectName } = req.body;

    const existing = await NFT.findOne({
      candyMachineId
    });

    const mintedAddresses = await getMintAddresses(candyMachineId);

    if (existing && existing.addresses.length === mintedAddresses.length)
      return res.status(StatusCodes.OK).json({
        message: 'Nothing new minted.'
      });

    const createNFT = await NFT.create({
      addresses: mintedAddresses,
      name: projectName,
      candyMachineId
    });

    const { addresses } = createNFT;

    const addressesMetadata = await Promise.all(
      addresses.map(async (address) => {
        const metadataKey = await getMetadataKey(address);
        const metadataInfo = await SOLANA_RPC_CONNECTION.getAccountInfo(toPublicKey(metadataKey));

        const decodedMetadata = decodeMetadata(metadataInfo.data);
        return {
          address,
          name: decodedMetadata.data.name,
          candyMachineId,
          projectName,
          symbol: decodedMetadata.data.symbol,
          uri: decodedMetadata.data.uri
        };
      })
    );

    const createNFTITEMS = await NFTItem.insertMany(addressesMetadata);

    return res.status(StatusCodes.OK).json(createNFTITEMS);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export default sourceNFT;
