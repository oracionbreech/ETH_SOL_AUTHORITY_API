import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import Authority from '../../model/Authority';

const RequirementsValidFields = [
  'twitterEnabled',
  'metamaskEnabled',
  'discordEnabled',
  'solanaEnabled',
  'ethBalance',
  'solBalance'
];

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

    await Authority.findByIdAndUpdate(requirements.pop().id, {
      ...fields
    });

    const newRequirements = await Authority.find();

    return res.status(StatusCodes.OK).json(newRequirements.pop());
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export default updateRequirements;
