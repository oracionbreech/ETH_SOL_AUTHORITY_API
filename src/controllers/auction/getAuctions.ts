import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';

// Models
import Auction from '../../model/Auction';

const getAuctions = async (req: Request, res: Response): Promise<any> => {
  try {
    const auctions = await Auction.find();

    return res.status(StatusCodes.OK).json(auctions);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export default getAuctions;
