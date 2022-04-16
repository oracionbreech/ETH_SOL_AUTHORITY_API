import axios from 'axios';
import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import addOAuthInterceptor, { OAuthInterceptorConfig } from 'axios-oauth-1.0a';

// Model
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

    if (!user)
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'User not found. Please try connecting again.'
      });

    // Create a client whose requests will be signed
    const client = axios.create();

    // Specify the OAuth options
    const options: OAuthInterceptorConfig = {
      algorithm: 'HMAC-SHA1',
      key: process.env.TWITTER_API_KEY,
      secret: process.env.TWITTER_API_SECRET,
      token: user.userToken,
      tokenSecret: user.userTokenSecret
    };

    // Add interceptor that signs requests
    addOAuthInterceptor(client, options);

    const followMonkaiTwitter = await client.post(
      'https://api.twitter.com/1.1/friendships/create.json?user_id=1489538806940258306&follow=true'
    );

    return res.status(StatusCodes.OK).json({ ...followMonkaiTwitter.data, user: user.toObject() });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export default verifyUser;
