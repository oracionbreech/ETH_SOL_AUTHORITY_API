import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';

import { getMints } from '../../utils/get-mints';

const getAllFlowers = async (req: Request, res: Response): Promise<any> => {
  const connectionURL = 'https://api.metaplex.solana.com';

  try {
    const mints = await getMints('8J9W44AfgWFMSwE4iYyZMNCWV9mKqovS5YHiVoKuuA2b', connectionURL);

    return res.status(StatusCodes.OK).json(mints.map((mint) => mint.data));
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export default getAllFlowers;
