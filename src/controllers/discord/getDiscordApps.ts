import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import { isEmpty } from 'lodash';

// Models
import DiscordApp from '../../model/DiscordApp';

interface AddDiscordAppRequest extends Request {
  query: {
    userId: string;
  };
}

const getDiscordApps = async (req: AddDiscordAppRequest, res: Response): Promise<any> => {
  try {
    const { userId } = req.query;

    if (isEmpty(userId)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Invalid query.'
      });
    }

    const discordApps = await DiscordApp.find({
      userId
    });

    return res.status(StatusCodes.OK).json(discordApps);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export default getDiscordApps;
