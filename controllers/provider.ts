import { Request, Response } from 'express';
import { ProviderModel } from '../models/provider';

export const providerController = {
  addProvider: async (request: Request, response: Response) => {
    try {
      const body = request.body; //need a check to not add the same product twice
      const model = new ProviderModel({ ...body });
      await model.save();
      response.status(200).send('Puede ser pa?');
    } catch (error) {
      console.log(error);
      response.status(500).send('Error');
    }
  },
};
