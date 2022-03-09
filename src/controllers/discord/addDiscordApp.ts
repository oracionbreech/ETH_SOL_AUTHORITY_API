import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import { isEmpty } from 'lodash';

// Models
import DiscordApp from '../../model/DiscordApp';

interface AddDiscordAppRequest extends Request {
  body: {
    secretKey: string;
    clientId: string;
    name: string;
  };
}

const addDiscordApp = async (req: AddDiscordAppRequest, res: Response): Promise<any> => {
  try {
    const { clientId, name, secretKey } = req.body;

    if (isEmpty(clientId) || isEmpty(name) || isEmpty(secretKey)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Invalid data sent.'
      });
    }

    const newDiscordApp = await DiscordApp.create({
      ...req.body
    });

    return res.status(StatusCodes.OK).json(newDiscordApp);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export default addDiscordApp;
