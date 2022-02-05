import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import { promises as fs } from 'fs';

const getAllFlowers = async (req: Request, res: Response): Promise<any> => {
  try {
    const minted = await fs.readFile('./minted.json');

    const mintedArray: Array<{ name: string }> = JSON.parse(minted.toString());

    return res.status(StatusCodes.OK).json(mintedArray.slice(0, 3).map((mint) => mint.name.replaceAll('\x00', '')));
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export default getAllFlowers;
