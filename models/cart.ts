import { Schema, model, Types } from 'mongoose';

export interface IDetail {
  qty: number;
  productPrice: number;
  productID: string;
}

export interface ICart {
  content: IDetail[];
  total: number;
  // state: Boolean;
}

const cartSchema = new Schema({
  content: [{ qty: Number, productPrice: Number, productID: String }],
  total: Number,
  // state: Boolean,
});

export const CartModel = model<ICart>('Cart', cartSchema);
