import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import Flower from '../../model/NFTItemMetadata';

const getAllFlowers = async (req: Request, res: Response): Promise<any> => {
  try {
    const flowers = await Flower.find();

    return res.status(StatusCodes.OK).json(flowers);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export default getAllFlowers;
