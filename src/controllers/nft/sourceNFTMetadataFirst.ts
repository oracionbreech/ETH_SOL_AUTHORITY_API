import axios from 'axios';
import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import { get, isEmpty } from 'lodash';

// Models
import NFTItemMetadata, { INFTItemMetadata } from '../../model/NFTItemMetadata';

// Utilities
import { getMints } from '../../utils/get-mints';

const createFlowerObject = async ({ arweaveURI, arweaveData }): Promise<INFTItemMetadata> => {
  const attributes = get(arweaveData, 'attributes', []);

  const creators = get(arweaveData, 'creators', []);

  const description = get(arweaveData, 'description', '');

  const image = get(arweaveData, 'image', '');

  const name = get(arweaveData, 'name', '');
  return {
    arweaveURI,
    attributes,
    creators,
    description,
    image,
    name,
    address: '',
    mintTransaction: ''
  };
};

interface RequestMetadataFirst extends Request {
  body: {
    candyMachineId: string;
  };
}

const sourceNFTMetadataFirst = async (req: RequestMetadataFirst, res: Response): Promise<any> => {
  const connectionURL = process.env.SOLANA_RPC_URL;
  const { candyMachineId } = req.body;
  try {
    const mints = await getMints(candyMachineId, connectionURL);

    const mintedNames: INFTItemMetadata[] = await Promise.all(
      mints
        .filter(
          (mint) =>
            String(mint.data.uri).replaceAll('\x00', '') !== 'null' &&
            !isEmpty(String(mint.data.uri).replaceAll('\x00', ''))
        )
        .map(async (mint) => {
          const arweaveURI = String(mint.data.uri).replaceAll('\x00', '');

          const { data } = await axios.get(arweaveURI);

          return createFlowerObject({ arweaveData: data, arweaveURI });
        })
    );

    const createFlowers = await NFTItemMetadata.insertMany(mintedNames);

    return res.status(StatusCodes.OK).json(createFlowers);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export default sourceNFTMetadataFirst;
