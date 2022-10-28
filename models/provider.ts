import { Schema, model } from 'mongoose';

interface IProvider {
  name: string;
  address: string;
  email: string;
}

const providerSchema = new Schema({
  name: { type: String, required: true },
  address: String,
  email: { type: String, required: true },
});

export const ProviderModel = model<IProvider>('Provider', providerSchema);
