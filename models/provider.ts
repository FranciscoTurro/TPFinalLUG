import { Schema, model } from "mongoose";

interface IProvider {
  nombre: String;
  Direccion: String;
  Email: String;
}

const providerSchema = new Schema({
  nombre: String,
  Direccion: String,
  Email: String,
});

export const ProviderModel = model<IProvider>("Provider", providerSchema);
