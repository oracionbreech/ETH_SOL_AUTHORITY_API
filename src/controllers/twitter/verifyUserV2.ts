import axios from 'axios';
import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';

interface VerifyUserRequest extends Request {
  query: {
    token: string;
  };
}

const projectTwitterID = '1420287833231659008';

const verifyUserV2 = async (req: VerifyUserRequest, res: Response): Promise<any> => {
  try {
    const { token } = req.query;

    const { data: userData } = await axios({
      method: 'get',
      url: 'https://api.twitter.com/2/users/me',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const { data: followTwitter } = await axios({
      method: 'POST',
      url: `https://api.twitter.com/2/users/${userData.data.id}/following`,
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      data: { target_user_id: projectTwitterID }
    });

    return res.status(StatusCodes.OK).json({
      ...userData.data,
      ...followTwitter.data
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export default verifyUserV2;
