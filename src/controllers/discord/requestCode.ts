import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';

const requestCode = async (req: Request, res: Response): Promise<any> => {
  try {
    return res.status(StatusCodes.OK).json({
      url: 'https://discord.com/api/oauth2/authorize?client_id=944219075142369291&redirect_uri=https%3A%2F%2Fholyversenft.com%2Fverification&response_type=code&scope=identify%20guilds%20guilds.members.read',
      type: 'auth_url'
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export default requestCode;
