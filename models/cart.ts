import { Schema, model, Types } from 'mongoose';

interface IDetail {
  qty: Number;
  detailPrice: Number;
  productID: Types.ObjectId;
}

interface ICart {
  content: IDetail[];
  total: Number;
  state: Boolean;
}

const cartSchema = new Schema({
  content: [{ qty: Number, detailPrice: Number }],
  total: Number,
  state: Boolean,
});

export const CartModel = model<ICart>('Cart', cartSchema);
