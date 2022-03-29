import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import { isEmpty } from 'lodash';
import Authority from '../../model/Authority';

const getRequirements = async (req: Request, res: Response): Promise<any> => {
  try {
    const requirements = await Authority.find();

    if (isEmpty(requirements))
      return res.status(StatusCodes.NOT_FOUND).json({
        message: 'No requirements found.'
      });

    return res.status(StatusCodes.OK).json(requirements.pop());
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export default getRequirements;
