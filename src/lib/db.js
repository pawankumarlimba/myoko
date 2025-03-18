import mongoose from 'mongoose';

export async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    const connection = mongoose.connection;
    // console.log(connection);

    connection.on('connected', () => {
      console.log('MongoDB connected successfully!!');
    });
    connection.on('error', (err) => {
      console.log('MongoDB connection error.' + err);
      process.exit();
    });
  } catch (error) {
    console.log('something is wrong');
    console.log(error);
  }
}
