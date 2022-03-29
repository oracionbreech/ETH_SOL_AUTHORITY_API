import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';

// Model
import Authority from '../../model/Authority';

const initRequirements = async (req: Request, res: Response): Promise<any> => {
  try {
    const requirements = await Authority.create({
      discordEnabled: false,
      metamaskEnabled: false,
      solanaEnabled: false,
      twitterEnabled: false
    });

    return res.status(StatusCodes.OK).json(requirements);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export default initRequirements;
