import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import { promises as fs } from 'fs';

// Utilities
import { getMints } from '../../utils/get-mints';

const sourceAllFlowers = async (req: Request, res: Response): Promise<any> => {
  const connectionURL = 'https://api.metaplex.solana.com';

  try {
    const mints = await getMints('8J9W44AfgWFMSwE4iYyZMNCWV9mKqovS5YHiVoKuuA2b', connectionURL);

    const mintedNames = mints.map((mint) => ({
      name: mint.data.name
    }));

    await fs.writeFile('./minted.json', JSON.stringify(mintedNames, null, 4));

    return res.status(StatusCodes.OK).json({ message: 'Minted JSON File has been created.' });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export default sourceAllFlowers;
