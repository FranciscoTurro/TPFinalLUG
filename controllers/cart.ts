import { Request, Response } from 'express';
import { CartModel } from '../models/cart';
import { ProductModel } from '../models/product';
import { ICart } from '../models/cart';

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
          cartInDB.total = calcTotal(cartInDB);
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
          cart.total = calcTotal(cart);
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

const calcTotal = (cart: ICart): number => {
  let total: number = 0;
  cart.content.forEach((element) => {
    total += element.productPrice * element.qty;
  });
  return total;
};
