import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import { isEmpty } from 'lodash';

// Models
import GuildRole from '../../model/GuildRole';

interface AddRoleRequest extends Request {
  body: {
    roleId: string;
    name: string;
    appId: string;
  };
}

const addRole = async (req: AddRoleRequest, res: Response): Promise<any> => {
  try {
    const { roleId, name, appId } = req.body;

    if (isEmpty(roleId) || isEmpty(name) || isEmpty(appId)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Invalid data sent.'
      });
    }

    const newGuildRole = await GuildRole.create({
      ...req.body
    });

    return res.status(StatusCodes.OK).json(newGuildRole);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export default addRole;
