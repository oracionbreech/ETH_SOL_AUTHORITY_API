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
      redirect_uri: 'http://localhost:3000/discord',
      client_secret: 'r6Vt6p42Jtsx05wqPgvh9zy8VCsYTa4G',
      client_id: '943755436207796224'
    });

    const response = await axios({
      method: 'post',
      url: 'https://discordapp.com/api/oauth2/token',
      headers: {
        Authorization: 'Basic OTQzNzU1NDM2MjA3Nzk2MjI0OnI2VnQ2cDQySnRzeDA1d3FQZ3ZoOXp5OFZDc1lUYTRH',
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
