import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import Auction from '../../model/Auction';

const registerAuctionInfo = async (req: Request, res: Response): Promise<any> => {
  try {
    const owner = req.body.owner as string; //req.body.cartId;
    const nft_mint = req.body.nft_mint as string; //req.body.cartId;
    const token_mint = req.body.token_mint as string; //req.body.cartId;
    const auctionTitle = req.body.auctionTitle as string; //req.body.cartId;
    const floor = parseInt(req.body.floor as string); //req.body.cartId;
    const increment = parseInt(req.body.increment as string); //req.body.cartId;
    const biddercap = parseInt(req.body.biddercap as string); //req.body.cartId;
    const startTime = req.body.startTime; //req.body.cartId;
    const endTime = req.body.endTime; //req.body.cartId;
    const amount = req.body.amount; //req.body.cartId;
    const auction_id = req.body.auction_id as string; //req.body.cartId;

    if (
      !owner ||
      !nft_mint ||
      !token_mint ||
      !auctionTitle ||
      !floor ||
      !increment ||
      !biddercap ||
      !startTime ||
      !endTime ||
      !amount ||
      !auction_id
    ) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Invalid data sent.'
      });
    }

    const auction = await Auction.create({
      owner,
      nft_mint,
      token_mint,
      auctionTitle,
      floor,
      increment,
      biddercap,
      startTime,
      endTime,
      amount,
      auction_id
    });

    return res.status(StatusCodes.OK).json(auction);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export default registerAuctionInfo;
