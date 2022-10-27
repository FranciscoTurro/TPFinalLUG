import { Request, Response } from 'express';
import { CartModel } from '../models/cart';
import { ProductModel } from '../models/product';
import { ICart, IDetail } from '../models/cart';

export const cartController = {
  addItem: async (request: Request, response: Response) => {
    try {
      let qty: number = parseInt(request.body.qty);
      if (request.body.qty == undefined) qty = 1; //if the request doesnt specify a quantity to add it defaults to 1
      let cartInDB = await CartModel.findOne();
      if (!cartInDB) cartInDB = new CartModel();
      const product = await ProductModel.findById(request.body.id);
      const sameID = (element: IDetail) => element.productID == request.body.id;
      const index = cartInDB.content.findIndex(sameID);
      if (index != -1) {
        cartInDB.content[index].qty += qty;
      } else if (product && product.stock - qty > 0) {
        cartInDB.content.push({
          qty: qty,
          productPrice: product.price,
          productID: request.body.id,
          productName: product.name,
        });
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

//actualizar stock del producto agregar esto
//agregar required fields y regexs a los modelos
//agregar delete obviamente
//need a check to not add the same product or provider twice
//agrega checks necesarios, como que la cantidad de producto a agregar al detalle no sea 0
//otra, si no se agrega algo al carrito por el stock avisa
//add y delete un cart
