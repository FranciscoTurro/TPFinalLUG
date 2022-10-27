import { Request, Response } from 'express';
import { CartModel } from '../models/cart';
import { ProductModel } from '../models/product';
import { ICart, IDetail } from '../models/cart';

export const cartController = {
  addItem: async (request: Request, response: Response) => {
    try {
      const cartInDB = await CartModel.findOne();
      if (cartInDB) {
        const product = await ProductModel.findById(request.body.id);

        const sameID = (element: IDetail) =>
          element.productID == request.body.id;
        const index = cartInDB.content.findIndex(sameID);
        if (index != -1) {
          cartInDB.content[index].qty += parseInt(request.body.qty);
        } else if (product && product.stock - request.body.qty > 0) {
          cartInDB.content.push({
            qty: request.body.qty,
            productPrice: product.price,
            productID: request.body.id,
            productName: product.name,
          });
        }

        cartInDB.total = calcTotal(cartInDB);
        cartInDB.save();
        response.status(200).send('Ok');
      } else {
        const cart = new CartModel();
        const product = await ProductModel.findById(request.body.id);

        if (product && product.stock - request.body.qty > 0) {
          cart.content.push({
            qty: request.body.qty,
            productPrice: product.price,
            productID: request.body.id,
            productName: product.name,
          });
        }

        cart.total = calcTotal(cart);
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

//a todo esto, si (!request.body.qty) request.body.qty=1 agregar esto
//actualizar stock del producto agregar esto
//agregar required fields y regexs a los modelos
