import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';

const getRequirements = async (req: Request, res: Response): Promise<any> => {
  try {
    return res.status(StatusCodes.OK).json({});
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export default getRequirements;
