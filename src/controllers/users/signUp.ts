import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import { isEmpty } from 'lodash';

// Models
import User from '../../model/User';

interface AddDiscordAppRequest extends Request {
  body: {
    username: string;
    email: string;
    password: string;
  };
}

const signUp = async (req: AddDiscordAppRequest, res: Response): Promise<any> => {
  try {
    const { email, password, username } = req.body;

    if (isEmpty(email) || isEmpty(password) || isEmpty(username)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Invalid data sent.'
      });
    }

    const user = await User.create({
      username,
      email,
      password
    });

    return res.status(StatusCodes.OK).json(user);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export default signUp;
