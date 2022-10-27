import { Request, Response } from 'express';
import { Model } from 'mongoose';
import { ProductModel } from '../models/product';

export const productController = {
  addProduct: async (request: Request, response: Response) => {
    try {
      const body = request.body; //need a check to not add the same product twice
      const model = new ProductModel({ ...body });
      await model.save();
      response.status(200).send('Puede ser pa?');
    } catch (error) {
      console.log(error);
      response.status(500).send('Error');
    }
  },
  editProduct: async (request: Request, response: Response) => {
    try {
      await ProductModel.findByIdAndUpdate(request.body.id, {
        ...request.body,
      });
      response.status(200).send('Ok');
    } catch (error) {
      console.log(error);
      response.status(500).send('Error');
    }
  },
};
