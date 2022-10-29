import { Request, Response } from 'express';
import { CartModel } from '../models/cart';
import { ProductModel } from '../models/product';
import { ICart, IDetail } from '../models/cart';
import { IProduct } from '../models/product';

export const cartController = {
  addItem: async (request: Request, response: Response) => {
    try {
      if (request.body.qty <= 0) {
        response.status(500).send('Ingrese una cantidad valida');
        return;
      }

      let qty: number = parseInt(request.body.qty);
      if (request.body.qty == undefined) qty = 1;

      let cartInDB = await CartModel.findOne();
      if (!cartInDB) cartInDB = new CartModel();

      const product = await ProductModel.findById(request.body.id);

      const sameID = (element: IDetail) => element.productID == request.body.id;
      const index = cartInDB.content.findIndex(sameID);
      if (product && index != -1) {
        //si el carrito ya tiene un detalle de este producto (checkeo que existe el producto porque ts tira error si un objeto PUEDE ser nulo)
        if (product.stock - qty < 0) {
          response.status(500).send('Stock insuficiente');
          return;
        }
        cartInDB.content[index].qty += qty;
        subtractStock(product, qty);
        product.save();
      } else if (product && product.stock - qty > 0) {
        //si el carrito no tiene un detalle del producto
        subtractStock(product, qty);
        product.save();
        cartInDB.content.push({
          qty: qty,
          productPrice: product.price,
          productID: request.body.id,
          productName: product.name,
        });
      } else {
        //si el usuario quiere agregar mas productos de los que hay en el stock al carrito creado por primera vez viene por aca, crea un carrito vacio
        response.status(500).send('Stock insuficiente');
        cartInDB.save();
        return;
      }

      cartInDB.total = calcTotal(cartInDB);
      cartInDB.save();
      response.status(200).send(cartInDB.content);
    } catch (error) {
      console.log(error);
      response.status(500).send('Error');
    }
  },
  removeItem: async (request: Request, response: Response) => {
    try {
      if (request.body.qty <= 0) {
        response.status(500).send('Ingrese una cantidad valida');
        return;
      }

      let qty: number = parseInt(request.body.qty);
      if (request.body.qty == undefined) qty = 1;

      let cartInDB = await CartModel.findOne();
      if (!cartInDB) cartInDB = new CartModel();

      const product = await ProductModel.findById(request.body.id);

      const sameID = (element: IDetail) => element.productID == request.body.id;
      const index = cartInDB.content.findIndex(sameID);
      if (product && index != -1) {
        //si el carrito ya tiene un detalle de este producto (checkeo que existe el producto porque ts tira error si un objeto PUEDE ser nulo)
        cartInDB.content[index].qty -= qty;
        if (cartInDB.content[index].qty <= 0) cartInDB.content.splice(index, 1);
        addStock(product, qty);
        product.save();
      } else {
        response
          .status(500)
          .send(
            'Imposible remover items que todavia no fueron agregados al carrito'
          );
        return;
      }

      cartInDB.total = calcTotal(cartInDB);
      cartInDB.save();
      response.status(200).send(cartInDB.content);
    } catch (error) {
      console.log(error);
      response.status(500).send('Error');
    }
  },
  addCart: async (request: Request, response: Response) => {
    try {
      let cartInDB = await CartModel.findOne();
      if (!cartInDB) cartInDB = new CartModel();
      await cartInDB.save();
      response.status(200).send('Ok');
    } catch (error) {
      console.log(error);
      response.status(500).send('Error');
    }
  },
  removeCart: async (request: Request, response: Response) => {
    try {
      await CartModel.findByIdAndDelete(request.body.id);
      response.status(200).send('Ok');
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

const subtractStock = (product: IProduct, qty: number): void => {
  product.stock -= qty;
  if (product.stock < 0) product.stock = 0;
};

const addStock = (product: IProduct, qty: number): void => {
  product.stock += qty;
};
