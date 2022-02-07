import mongoose from 'mongoose';

export const MongooseInit = async () => {
  mongoose.connect(process.env.MONGODB_DATABASE_URI, () => {
    return {
      useNewUrlParser: true,
      useUnifiedTopology: true
    };
  });
};
