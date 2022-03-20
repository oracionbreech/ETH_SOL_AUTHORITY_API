import axios from 'axios';
import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import qs from 'qs';
import DiscordApp from '../../model/DiscordApp';

interface RequestTokenGrant extends Request {
  body: {
    code: string;
    clientId: string;
    redirectURI: string;
  };
}

const requestTokenGrant = async (req: RequestTokenGrant, res: Response): Promise<any> => {
  try {
    const { code, clientId, redirectURI } = req.body;

    if (!code || !clientId || !redirectURI)
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Invalid code or client ID.'
      });

    const findDiscordApp = await DiscordApp.findOne({
      clientId
    });

    if (!findDiscordApp)
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: `Can't find discord app requested.`
      });

    const data = qs.stringify({
      code,
      grant_type: 'authorization_code',
      redirect_uri: String(redirectURI),
      client_secret: String(findDiscordApp.secretKey),
      client_id: String(findDiscordApp.clientId)
    });

    const response = await axios({
      method: 'post',
      url: 'https://discordapp.com/api/oauth2/token',
      headers: {
        Authorization: `Basic ${btoa(`${String(clientId)}:${String(findDiscordApp.secretKey).toString()}`)}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: data
    });

    return res.status(StatusCodes.OK).json(response.data);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error.response);
  }
};

export default requestTokenGrant;
