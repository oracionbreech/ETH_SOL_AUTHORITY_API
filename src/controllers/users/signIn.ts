import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import { isEmpty } from 'lodash';

// Models
import User from '../../model/User';

interface AddDiscordAppRequest extends Request {
  body: {
    username: string;
    password: string;
  };
}

const signIn = async (req: AddDiscordAppRequest, res: Response): Promise<any> => {
  try {
    const { password, username } = req.body;

    if (isEmpty(password) || isEmpty(username)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Invalid data sent.'
      });
    }

    const user = await User.findOne({ username, password });

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: 'No user found.'
      });
    }

    return res.status(StatusCodes.OK).json(user);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export default signIn;
