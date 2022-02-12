import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';

// Models
import NFT from '../../model/NFT';

interface RequestNFT extends Request {
  params: {
    candyMachineId: string;
  };
}

const getNFT = async (req: RequestNFT, res: Response): Promise<any> => {
  try {
    const { candyMachineId } = req.params;

    const existing = await NFT.findOne({
      candyMachineId
    });

    return res.status(StatusCodes.OK).json(existing);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export default getNFT;
