import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';

const getAllFlowers = async (req: Request, res: Response): Promise<any> => {
  try {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: 'No flowers found.'
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export default getAllFlowers;
