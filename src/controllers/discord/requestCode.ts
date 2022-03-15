import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import DiscordApp from '../../model/DiscordApp';

interface CodeRequest {
  body: {
    clientId: string;
    redirectURI: string;
  };
}

const requestCode = async (req: CodeRequest, res: Response): Promise<any> => {
  try {
    const { clientId, redirectURI } = req.body;

    if (!clientId || !redirectURI)
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Please attach client ID or redirect uri.'
      });

    const findDiscordApp = await DiscordApp.findOne({
      clientId
    });

    if (!findDiscordApp)
      return res.status(StatusCodes.NOT_FOUND).json({
        message: 'Cannot find a discord app.'
      });

    return res.status(StatusCodes.OK).json({
      url: `https://discord.com/api/oauth2/authorize?client_id=${String(
        findDiscordApp.clientId
      )}&redirect_uri=${encodeURIComponent(
        String(redirectURI)
      )}&response_type=code&scope=identify%20guilds%20guilds.members.read`,
      type: 'auth_url'
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export default requestCode;
