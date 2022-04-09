import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import Twitter from '../../model/Twitter';
import TwitterUser from '../../model/TwitterUser';
import { twitter } from '../../services/twitter';

interface AuthCallbackRequest extends Request {
  query: {
    oauth_token: string;
    oauth_verifier: string;
  };
}

const authCallback = async (req: AuthCallbackRequest, res: Response): Promise<any> => {
  try {
    const oAuthParam = {
      oauth_token: req.query.oauth_token,
      oauth_verifier: req.query.oauth_verifier
    };

    const twitterSecret = await Twitter.findOne({
      authToken: req.query.oauth_token
    });

    // call function passing Auth and Token Secret
    const userInfo = await twitter.callback(oAuthParam, twitterSecret.tokenSecret);
    // Delete the tokenSecret securely
    await Twitter.deleteOne({
      tokenSecret: twitterSecret.tokenSecret
    });

    const findUser = await TwitterUser.findOne({
      userId: userInfo.userId
    });

    if (findUser) {
      const updatedUser = await TwitterUser.findOneAndUpdate(
        {
          userId: userInfo.userId
        },
        userInfo
      );

      return res
        .status(StatusCodes.OK)
        .redirect(`${process.env.REACT_APP_BASE_URL}/whitelist/?token=${updatedUser.userToken}`);
    }

    await TwitterUser.create(userInfo);

    return res.status(StatusCodes.OK).redirect(`${process.env.REACT_APP_BASE_URL}/whitelist/`);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export default authCallback;
