import { Schema, model, Types } from 'mongoose';

export interface IProduct {
  price: number;
  description: string;
  stock: number;
  name: string;
  providerID: Types.ObjectId;
}

const productSchema = new Schema({
  price: { type: Number, required: true },
  description: String,
  stock: { type: Number, required: true },
  name: { type: String, required: true },
  providerID: { type: Schema.Types.ObjectId, ref: 'Provider', required: true },
});

export const ProductModel = model<IProduct>('Product', productSchema);
