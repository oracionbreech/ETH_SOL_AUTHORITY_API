import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';

// Utilities
import { getMintAddresses } from '../../utils/get-mints-v2';

const getAllFlowersV2 = async (req: Request, res: Response): Promise<any> => {
  try {
    const mintedAddresses = await getMintAddresses('8J9W44AfgWFMSwE4iYyZMNCWV9mKqovS5YHiVoKuuA2b');

    return res.status(StatusCodes.OK).json(mintedAddresses);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export default getAllFlowersV2;
