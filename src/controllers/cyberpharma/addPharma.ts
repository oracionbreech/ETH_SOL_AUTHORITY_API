import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import { isEmpty } from 'lodash';

// Models
import Pharma from '../../model/Pharma';

interface AddPharmaRequest extends Request {
  body: {
    address: string;
    signedMessage: string;
    email: string;
  };
}

const addPharma = async (req: AddPharmaRequest, res: Response): Promise<any> => {
  try {
    const { address, email, signedMessage } = req.body;

    if (isEmpty(address) || isEmpty(email) || isEmpty(signedMessage)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Invalid data sent.'
      });
    }

    const existingPharma = await Pharma.findOne({
      $or: [
        {
          email
        },
        {
          address
        }
      ]
    });

    if (existingPharma) {
      if (existingPharma.address === address && existingPharma.email === email) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: 'Solana Address and email pair has already been added.'
        });
      }

      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Solana Address or email pair has already been added.'
      });
    }

    const pharma = await Pharma.create({
      ...req.body
    });

    return res.status(StatusCodes.OK).json(pharma);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export default addPharma;
