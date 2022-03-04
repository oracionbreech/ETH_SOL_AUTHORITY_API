import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';

const requestCode = async (req: Request, res: Response): Promise<any> => {
  try {
    return res.status(StatusCodes.OK).json({
      url: `https://discord.com/api/oauth2/authorize?client_id=${String(
        process.env.DISCORD_CLIENT_ID
      )}&redirect_uri=${String(
        process.env.DISCORD_AUTH_REDIRECT_URI
      )}&response_type=code&scope=identify%20guilds%20guilds.members.read`,
      type: 'auth_url'
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export default requestCode;
