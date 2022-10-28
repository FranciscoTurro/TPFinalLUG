import { Request, Response } from 'express';
import { ProviderModel } from '../models/provider';

export const providerController = {
  addProvider: async (request: Request, response: Response) => {
    try {
      let check = await ProviderModel.findOne({ email: request.body.email });
      //los ids de mongo se autogeneran asi que no puedo identificar a cada proveedor como unico. puse email para agregar algun tipo de verificacion
      if (check) {
        response.status(500).send('Proveedor ya existente en la base de datos');
        return;
      }

      const body = request.body;
      const model = new ProviderModel({ ...body });
      await model.save();
      response.status(200).send('Ok');
    } catch (error) {
      console.log(error);
      response.status(500).send('Error');
    }
  },
  editProvider: async (request: Request, response: Response) => {
    try {
      await ProviderModel.findByIdAndUpdate(request.body.id, {
        ...request.body,
      });
      response.status(200).send('Ok');
    } catch (error) {
      console.log(error);
      response.status(500).send('Error');
    }
  },
  deleteProvider: async (request: Request, response: Response) => {
    try {
      await ProviderModel.findByIdAndDelete(request.body.id);
      response.status(200).send('Ok');
    } catch (error) {
      console.log(error);
      response.status(500).send('Error');
    }
  },
};
