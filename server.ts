import dotenv from 'dotenv';
import express, { Express } from 'express';
import mongoose from 'mongoose';
import apiRoutes from './routes/api';

dotenv.config();

const app: Express = express();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server up at port ${process.env.PORT}`);
});

connectToDb()
  .then(() => console.log('Database connected'))
  .catch((err) => console.log(err));

async function connectToDb() {
  if (process.env.dbString) {
    await mongoose.connect(process.env.dbString);
  } else {
    console.log('Connection string missing');
  }
}
