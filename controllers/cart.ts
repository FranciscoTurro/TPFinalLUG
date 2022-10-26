import { Request, Response } from 'express';
import { CartModel } from '../models/cart';
import { ProductModel } from '../models/product';
import { Model } from 'mongoose';

export const cartController = {
  addItem: async (request: Request, response: Response) => {
    try {
      const cartInBD = await CartModel.find();
      if (!cartInBD.length) {
        const cart = new CartModel(); //when it works check if i can erase const cart = and the brackets
      }

      const product = await ProductModel.findById(request.body.id);
      if (product && product.stock - request.body.qty > 0) {
        cartInBD[0].content.push({
          qty: request.body.qty,
          productPrice: product.price,
          productID: request.body.id,
        });
      }
      response.status(200).send('IT WORKED LMAO');
    } catch (error) {
      console.log(error);
      response.status(500).send('Error');
    }
  },
};
