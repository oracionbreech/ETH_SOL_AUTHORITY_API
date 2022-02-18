import axios from 'axios';
import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';

interface GetMemberInfoRequest extends Request {
  query: {
    token: string;
  };
}

const getMembers = async (req: GetMemberInfoRequest, res: Response): Promise<any> => {
  try {
    const guildMemberInfo = await axios.get('https://discordapp.com/api/users/@me/guilds/894275198231121960/member', {
      headers: {
        Authorization: `Bearer ${req.query.token}`
      }
    });

    return res.status(StatusCodes.OK).json(guildMemberInfo.data);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export default getMembers;
