import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import { get } from 'lodash';

// Models
import NFT from '../../model/NFT';
import NFTItem from '../../model/NFTItem';
import NFTItemMetadata from '../../model/NFTItemMetadata';

interface RequestNFT extends Request {
  params: {
    candyMachineId: string;
  };
  query: {
    limit: string;
    skip: string;
  };
}

const getNFT = async (req: RequestNFT, res: Response): Promise<any> => {
  try {
    const { candyMachineId } = req.params;

    const { limit = 10, skip = 0 } = req.query;

    const existing = await NFT.findOne({
      candyMachineId
    });

    if (!existing)
      return res.status(StatusCodes.OK).json({
        message: 'NFT project has not been sourced yet.'
      });

    const nftMetadata = await NFTItem.find(
      {},
      {},
      {
        skip: Number(skip),
        limit: Number(limit)
      }
    );

    const nftMetadataWithAttributes = await Promise.all(
      nftMetadata.map(async (nft) => {
        const nftItemMetadata = await NFTItemMetadata.findOne({
          name: nft.name
        });

        const { candyMachineId, address, projectName, name, symbol, uri } = nft;

        return {
          address,
          name,
          candyMachineId,
          projectName,
          symbol,
          uri,
          attributes: get(nftItemMetadata, 'attributes', []),
          image: get(nftItemMetadata, 'image', '')
        };
      })
    );

    return res.status(StatusCodes.OK).json(nftMetadataWithAttributes);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export default getNFT;
