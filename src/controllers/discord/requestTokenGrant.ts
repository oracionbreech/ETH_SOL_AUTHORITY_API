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
      redirect_uri: 'https://eth-verification.netlify.app',
      client_secret: 'g3cEXAgSwhiSEAK_RjhR7BK_WYZEA4gO',
      client_id: '944219075142369291'
    });

    const response = await axios({
      method: 'post',
      url: 'https://discordapp.com/api/oauth2/token',
      headers: {
        Authorization: 'Basic OTQ0MjE5MDc1MTQyMzY5MjkxOmczY0VYQWdTd2hpU0VBS19SamhSN0JLX1dZWkVBNGdP',
        'Content-Type': 'application/x-www-form-urlencoded',
        Cookie:
          '__dcfduid=eb43922e8fbd11ecb8df42010a0a0a67; __sdcfduid=eb43922e8fbd11ecb8df42010a0a0a6798cc2fb1046b5ddb21712d278617b137ddf8fdc941cb85bdc5b6817054fca084'
      },
      data: data
    });

    return res.status(StatusCodes.OK).json(response.data);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export default requestTokenGrant;
