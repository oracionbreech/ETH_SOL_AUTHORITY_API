import axios from 'axios';
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

    if (!user)
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'User not found. Please try connecting again.'
      });

    const followMonkaiTwitter = await axios.post(
      `https://api.twitter.com/1.1/friendships/create.json?user_id=44196397&follow=true&oauth_consumer_key=eNh84U7XeOXjzYp7zihnAsDeZ&oauth_token=${user.userToken}&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1649938022&oauth_nonce=QyadXIF2AH3&oauth_version=1.0&oauth_signature=ePc8yVjj8r58bfLAux08VwrPKzU%3D`,
      {},
      {
        headers: {
          'content-type': 'application/json',
          Cookie:
            'guest_id=v1%3A164795006369164092; guest_id_ads=v1%3A164795006369164092; guest_id_marketing=v1%3A164795006369164092; personalization_id="v1_tX8ZpbOgeWlxJRAfwYStJQ=="; lang=en'
        }
      }
    );

    return res.status(StatusCodes.OK).json({ ...followMonkaiTwitter.data, ...user });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export default verifyUser;
