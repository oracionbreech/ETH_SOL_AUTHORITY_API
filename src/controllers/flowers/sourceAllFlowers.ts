import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';

// Models
import Flower, { IFlower } from '../../model/flower';

// Utilities
import { getMints } from '../../utils/get-mints';

const sourceAllFlowers = async (req: Request, res: Response): Promise<any> => {
  const connectionURL = 'https://api.metaplex.solana.com';

  try {
    const mints = await getMints('8J9W44AfgWFMSwE4iYyZMNCWV9mKqovS5YHiVoKuuA2b', connectionURL);

    const mintedNames: IFlower[] = mints.map((mint) => ({
      name: String(mint.data.name).replaceAll('\x00', ''),
      arweaveURI: String(mint.data.uri).replaceAll('\x00', '')
    }));

    const createFlowers = await Flower.insertMany(mintedNames);

    return res.status(StatusCodes.OK).json(createFlowers);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export default sourceAllFlowers;
