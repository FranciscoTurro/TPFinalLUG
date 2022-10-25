import { Schema, model, Types } from 'mongoose';

interface IProduct {
  price: Number;
  description: String;
  stock: Number;
  name: String;
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
