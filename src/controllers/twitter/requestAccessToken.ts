import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import qs from 'qs';
import axios from 'axios';

interface RequestAccessToken extends Request {
  body: {
    code: string;
  };
}

const requestAccessToken = async (req: RequestAccessToken, res: Response): Promise<any> => {
  try {
    if (!req.body.code)
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Twitter Authentication Code Missing.'
      });

    const data = qs.stringify({
      code: req.body.code,
      grant_type: 'authorization_code',
      client_id: `${String(process.env.TWITTER_OAUTH2_CLIENT_ID)}`,
      redirect_uri: `${process.env.REACT_APP_BASE_URL}/redirect`,
      code_verifier: 'challenge'
    });

    const { data: userAccessToken } = await axios({
      method: 'post',
      url: 'https://api.twitter.com/2/oauth2/token',
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${String(process.env.TWITTER_OAUTH2_CLIENT_ID)}:${String(
            process.env.TWITTER_OAUTH2_CLIENT_SECRET
          ).toString()}`
        ).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data
    });

    return res.status(StatusCodes.OK).json(userAccessToken);
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error_description) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.response.data.error_description
      });
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export default requestAccessToken;
