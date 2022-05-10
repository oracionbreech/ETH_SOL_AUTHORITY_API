import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';

// Model
import Pharma from '../../model/Pharma';

interface RegisterWhitelistRequest extends Request {
  params: {
    id: string;
  };
}

const getPharmaWhitelistedById = async (req: RegisterWhitelistRequest, res: Response): Promise<any> => {
  try {
    if (!req.params.id)
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Please specify ID.'
      });

    const whitelist = await Pharma.findById(req.params.id);

    return res.status(StatusCodes.OK).json(whitelist);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export default getPharmaWhitelistedById;
