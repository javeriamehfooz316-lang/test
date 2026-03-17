import mongoose from "mongoose";

const getMongoUri = () => process.env.MONGODB_URI || process.env.Mongodb_URI;

// Global cache (important for Next.js)
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  const mongoUri = getMongoUri();

  if (!mongoUri) {
    throw new Error("Please define MONGODB_URI in your environment.");
  }

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(mongoUri, {
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

export default connectDB;