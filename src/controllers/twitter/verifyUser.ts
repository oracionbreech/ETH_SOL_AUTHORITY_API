import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';

import TwitterUser from '../../model/TwitterUser';

interface VerifyUserRequest extends Request {
  query: {
    token: string;
  };
}

const verifyUser = async (req: VerifyUserRequest, res: Response): Promise<any> => {
  try {
    const { token } = req.query;

    const user = await TwitterUser.findOne({
      userToken: token
    });

    return res.status(StatusCodes.OK).json(user);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export default verifyUser;
