import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';

const requestCode = async (req: Request, res: Response): Promise<any> => {
  try {
    return res.status(StatusCodes.OK).json({
      url: 'https://discord.com/oauth2/authorize?client_id=943755436207796224&scope=identify&response_type=code&redirect_uri=http://localhost:3000/discord',
      type: 'auth_url'
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export default requestCode;
