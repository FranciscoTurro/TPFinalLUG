import { Schema, model } from 'mongoose';

interface IProvider {
  name: String;
  address: String;
  email: String;
}

const providerSchema = new Schema({
  name: String,
  address: String,
  email: String,
});

export const ProviderModel = model<IProvider>('Provider', providerSchema);
