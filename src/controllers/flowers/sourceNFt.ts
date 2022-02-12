import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import NFT from '../../model/NFT';

// Utilities
import { getMintAddresses } from '../../utils/get-mints-v2';

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

    /**
     * @function step skips creating the candy machine record if existing
     */
    if (existing)
      return res.status(StatusCodes.CREATED).json({
        message: 'Candy machine ID has already been sourced.',
        candyMachineId
      });

    const mintedAddresses = await getMintAddresses(candyMachineId);

    const createNFT = await NFT.create({
      addresses: mintedAddresses,
      name: projectName,
      candyMachineId
    });

    return res.status(StatusCodes.OK).json(createNFT);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export default sourceNFT;
