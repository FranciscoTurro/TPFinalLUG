import { Request, Response } from 'express';
import { CartModel } from '../models/cart';
import { ProductModel } from '../models/product';
import { model, Model } from 'mongoose';

export const cartController = {
  addItem: async (request: Request, response: Response) => {
    try {
      const cartInDB = await CartModel.findOne();
      if (cartInDB) {
        const product = await ProductModel.findById(request.body.id);
        if (product && product.stock - request.body.qty > 0) {
          cartInDB.content.push({
            qty: request.body.qty,
            productPrice: product.price,
            productID: request.body.id,
          });
        }
        cartInDB.save();
        response.status(200).send('Ok');
      } else {
        const cart = new CartModel();
        const product = await ProductModel.findById(request.body.id);
        if (product && product.stock - request.body.qty > 0) {
          cart.content.push({
            qty: request.body.qty,
            productPrice: product.price,
            productID: product.id,
          });
        }
        cart.save();
        response.status(200).send('Ok');
      }
    } catch (error) {
      console.log(error);
      response.status(500).send('Error');
    }
  },
};
//cart.total = calcularTotal()
