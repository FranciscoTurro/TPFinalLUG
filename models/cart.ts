import { Schema, model, Types } from "mongoose";

interface IDetalle {
  cantidad: Number;
  precioTotalDetalle: Number;
  productID: Types.ObjectId;
}

interface ICart {
  contenido: IDetalle[];
  total: Number;
  estado: Boolean;
}

const cartSchema = new Schema({
  contenido: [{ cantidad: Number, precioTotalDetalle: Number }],
  total: Number,
  estado: Boolean,
});

export const CartModel = model<ICart>("Cart", cartSchema);
