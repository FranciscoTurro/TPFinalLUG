import { Schema, model, Types } from 'mongoose';

export interface IDetail {
  qty: number;
  productPrice: number;
  productID: Types.ObjectId;
  productName: string;
}

export interface ICart {
  content: IDetail[];
  total: number;
}

const cartSchema = new Schema({
  content: [
    {
      qty: Number,
      productPrice: Number,
      productID: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
      productName: String,
    },
  ],
  total: Number,
});

export const CartModel = model<ICart>('Cart', cartSchema);
