import { Schema, model, Types } from "mongoose";

interface IProduct {
  precio: Number;
  descripcion: String;
  stock: Number;
  nombre: String;
  providerID: Types.ObjectId;
}

const productSchema = new Schema({
  precio: Number,
  descripcion: String,
  stock: Number,
  nombre: String,
  providerID: { type: Schema.Types.ObjectId, ref: "Provider" },
});

export const ProductModel = model<IProduct>("Product", productSchema);
