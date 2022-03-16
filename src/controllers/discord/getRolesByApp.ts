import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import GuildRole from '../../model/GuildRole';

interface GetRolesRequest extends Request {
  query: {
    app: string;
  };
}

const getRolesByApp = async (req: GetRolesRequest, res: Response): Promise<any> => {
  try {
    const roles = await GuildRole.find({
      appId: req.query.app
    });

    return res.status(StatusCodes.OK).json(roles);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export default getRolesByApp;
