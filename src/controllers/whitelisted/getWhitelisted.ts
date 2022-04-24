import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import Whitelisted from '../../model/Whitelisted';

interface RegisterWhitelistRequest extends Request {
  query: {
    start: string;
  };
}

const getWhitelisted = async (req: RegisterWhitelistRequest, res: Response): Promise<any> => {
  try {
    const whitelist = await Whitelisted.find();

    return res.status(StatusCodes.OK).json(whitelist);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export default getWhitelisted;
