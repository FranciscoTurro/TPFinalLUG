import { Schema, model, Types } from 'mongoose';

interface IDetail {
  qty: number;
  productPrice: number;
  productID: Types.ObjectId;
}

interface ICart {
  content: IDetail[];
  total: number;
  // state: Boolean;
}

const cartSchema = new Schema({
  content: [{ qty: Number, productPrice: Number }],
  total: Number,
  // state: Boolean,
});

export const CartModel = model<ICart>('Cart', cartSchema);
