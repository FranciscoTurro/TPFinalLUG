import { Schema, model, Types } from 'mongoose';

interface IProduct {
  price: number;
  description: string;
  stock: number;
  name: string;
  providerID: Types.ObjectId;
}

const productSchema = new Schema({
  price: Number,
  description: String,
  stock: Number,
  name: String,
  providerID: { type: Schema.Types.ObjectId, ref: 'Provider' },
});

export const ProductModel = model<IProduct>('Product', productSchema);
