import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';

const requestCode = async (req: Request, res: Response): Promise<any> => {
  try {
    return res.status(StatusCodes.OK).json({
      url: 'https://discord.com/api/oauth2/authorize?client_id=944219075142369291&redirect_uri=https%3A%2F%2Feth-verification.netlify.app&response_type=code&scope=guilds%20identify%20guilds.members.read',
      type: 'auth_url'
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export default requestCode;
