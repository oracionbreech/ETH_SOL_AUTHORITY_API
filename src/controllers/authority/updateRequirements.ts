import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import Authority from '../../model/Authority';

const RequirementsValidFields = ['twitterEnabled', 'metamaskEnabled', 'discordEnabled', 'solanaEnabled'];

interface GetRequirementsRequest extends Request {
  body: {
    fields: Array<{
      fieldName: boolean;
    }>;
  };
}

const updateRequirements = async (req: GetRequirementsRequest, res: Response): Promise<any> => {
  try {
    const { fields } = req.body;

    const areFieldsValid =
      Object.keys(fields).filter((field: string) => !RequirementsValidFields.includes(field)).length === 0;

    if (!fields || !areFieldsValid)
      return res.status(StatusCodes.NOT_FOUND).json({
        message: 'Requirement fields invalid.'
      });

    const requirements = await Authority.find();

    const updateRequirements = await Authority.findByIdAndUpdate(requirements.pop().id, {
      ...fields
    });

    return res.status(StatusCodes.OK).json(updateRequirements);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export default updateRequirements;
