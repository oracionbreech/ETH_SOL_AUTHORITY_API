import axios from 'axios';
import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';

interface GetMeRequest extends Request {
  query: {
    token: string;
  };
}

const getME = async (req: GetMeRequest, res: Response): Promise<any> => {
  try {
    const guildMemberInfo = await axios.get(`https://discordapp.com/api/users/@me`, {
      headers: {
        Authorization: `Bearer ${req.query.token}`
      }
    });

    return res.status(StatusCodes.OK).json(guildMemberInfo.data);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export default getME;
