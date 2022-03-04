import axios from 'axios';
import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import qs from 'qs';

interface RequestTokenGrant extends Request {
  query: {
    code: string;
  };
}

const requestTokenGrant = async (req: RequestTokenGrant, res: Response): Promise<any> => {
  try {
    const { code } = req.query;

    const data = qs.stringify({
      code,
      grant_type: 'authorization_code',
      redirect_uri: String(process.env.DISCORD_AUTH_REDIRECT_URI),
      client_secret: String(process.env.DISCORD_CLIENT_SECRET),
      client_id: String(process.env.DISCORD_CLIENT_ID)
    });

    const response = await axios({
      method: 'post',
      url: 'https://discordapp.com/api/oauth2/token',
      headers: {
        Authorization: `Basic ${btoa(
          `${String(process.env.DISCORD_CLIENT_ID)}:${String(process.env.DISCORD_CLIENT_SECRET).toString()}`
        )}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: data
    });

    return res.status(StatusCodes.OK).json(response.data);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export default requestTokenGrant;
