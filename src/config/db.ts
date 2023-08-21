import mongoose from 'mongoose';

const connection = async () => {
  try {
    const MONGO_URL: string = process.env.MONGO_URL || '';
    await mongoose.connect(MONGO_URL);
    console.log('MONGODB CONNECTED');
  } catch (err) {
    console.log(`MONGODB ERROR : ${err}`);
  }
};
export { connection };
