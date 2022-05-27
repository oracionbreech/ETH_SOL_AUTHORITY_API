import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';

const requestAuthV2 = async (req: Request, res: Response): Promise<any> => {
  try {
    return res
      .status(StatusCodes.OK)
      .json(
        `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${process.env.TWITTER_OAUTH2_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_BASE_URL}&scope=users.read%20tweet.read%20follows.write%20follows.read%20offline.access&state=state&code_challenge=challenge&code_challenge_method=plain`
      );
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export default requestAuthV2;
