import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

export const connect = (mongoURI = MONGO_URI) => {
  if (!mongoURI)
    throw new Error(
      "MongoDB URI not found. Check your environment variable to ensure that the URL is set correctly."
    );

  mongoose.set("strictQuery", false);

  return mongoose.connect(mongoURI);
};

export const disconnect = () => mongoose.disconnect();

export const dropDatabase = () => mongoose.connection.db.dropDatabase();
