import mongoose from "mongoose";

const getMongoUri = () => process.env.MONGODB_URI || process.env.Mongodb_URI;

// Reuse connection in dev/hot-reload and serverless environments.
let cached = globalThis.mongoose;

if (!cached) {
  cached = globalThis.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  const mongoUri = getMongoUri();

  if (!mongoUri) {
    throw new Error("Please define MONGODB_URI in your environment.");
  }

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(mongoUri, {
        bufferCommands: false,
      })
      .catch((error) => {
        // Allow retry on next request if first connect fails.
        cached.promise = null;
        throw error;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

export default connectDB;
