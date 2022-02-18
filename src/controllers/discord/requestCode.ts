import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';

const requestCode = async (req: Request, res: Response): Promise<any> => {
  try {
    return res.status(StatusCodes.OK).json({
      url: 'https://discord.com/api/oauth2/authorize?client_id=943755436207796224&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fdiscord&response_type=code&scope=identify%20guilds',
      type: 'auth_url'
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export default requestCode;
