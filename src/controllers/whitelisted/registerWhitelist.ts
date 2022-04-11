import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import { isEmpty } from 'lodash';

// Model
import Whitelisted, { IWhitelisted } from '../../model/Whitelisted';

interface RegisterWhitelistRequest extends Request {
  body: IWhitelisted;
}

const registerWhitelist = async (req: RegisterWhitelistRequest, res: Response): Promise<any> => {
  try {
    const { metamask, solana, twitter } = req.body;

    if ((isEmpty(metamask) || isEmpty(solana)) && isEmpty(twitter))
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Invalid data sent.'
      });

    const findExistingWhitelist = await Whitelisted.findOne({
      $or: [{ metamask }, { solana }, { twitter }]
    });

    if (findExistingWhitelist) {
      return res.status(StatusCodes.OK).json({ ...findExistingWhitelist, existing: true });
    }

    const whitelist = await Whitelisted.create({ metamask, solana, twitter });

    return res.status(StatusCodes.OK).json({ ...whitelist, existing: false });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export default registerWhitelist;
