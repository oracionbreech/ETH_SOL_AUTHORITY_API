import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import Twitter from '../../model/Twitter';
import { twitter } from '../../services/twitter';

const requestAuth = async (req: Request, res: Response): Promise<any> => {
  try {
    const result = await twitter.login();

    await Twitter.create({
      authToken: result.url.split('=')[1],
      tokenSecret: result.tokenSecret
    });

    return res.status(StatusCodes.OK).json(result.url);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export default requestAuth;
