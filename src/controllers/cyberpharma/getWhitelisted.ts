import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';

// Model
import Pharma from '../../model/Pharma';

interface RegisterWhitelistRequest extends Request {
  query: {
    start: string;
  };
}

const getPharmaWhitelisted = async (req: RegisterWhitelistRequest, res: Response): Promise<any> => {
  try {
    const whitelist = await Pharma.find();

    return res.status(StatusCodes.OK).json(whitelist);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export default getPharmaWhitelisted;
