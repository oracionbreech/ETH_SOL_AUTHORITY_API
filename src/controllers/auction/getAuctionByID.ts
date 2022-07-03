import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';

// Models
import Auction from '../../model/Auction';

const getAuctionByID = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;

    if (!id)
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Please specify id'
      });

    const auction = await Auction.findOne({
      auction_id: id
    });

    if (!auction)
      return res.status(StatusCodes.NOT_FOUND).json({
        message: 'No auction found by ID.'
      });

    return res.status(StatusCodes.OK).json(auction);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export default getAuctionByID;
