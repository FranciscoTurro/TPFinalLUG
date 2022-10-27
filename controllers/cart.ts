import { Request, Response } from 'express';
import { CartModel } from '../models/cart';
import { ProductModel } from '../models/product';
import { ICart, IDetail } from '../models/cart';

export const cartController = {
  addItem: async (request: Request, response: Response) => {
    try {
      let qty: number = parseInt(request.body.qty);
      if (request.body.qty == undefined || request.body.qty < 0) qty = 1;
      let cartInDB = await CartModel.findOne();
      if (!cartInDB) cartInDB = new CartModel();
      const product = await ProductModel.findById(request.body.id);
      const sameID = (element: IDetail) => element.productID == request.body.id;
      const index = cartInDB.content.findIndex(sameID);
      if (product && index != -1) {
        if (product.stock - qty < 0) {
          response.status(500).send('Stock insuficiente');
          return;
        }
        cartInDB.content[index].qty += qty;
        product.stock -= qty;
        product.save();
      } else if (product && product.stock - qty > 0) {
        product.stock -= qty;
        product.save();
        cartInDB.content.push({
          qty: qty,
          productPrice: product.price,
          productID: request.body.id,
          productName: product.name,
        });
      } else {
        //si el usuario quiere agregar mas productos de los que hay en el stock al carrito creado por primera vez viene por aca, asi que no se crea un carrito en ningun momento. no encuentro una solucion mejor
        response.status(500).send('Stock insuficiente');
        return;
      }
      cartInDB.total = calcTotal(cartInDB);
      cartInDB.save();
      response.status(200).send(cartInDB.content); //have it send ok later
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

//agregar required fields y regexs a los modelos
//agregar delete obviamente
//need a check to not add the same product or provider twice
//add y delete un cart
