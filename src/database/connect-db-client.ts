/*################################################
###### NEEDED TO CONNECT MONGOOSE TO DB  #########
#################################################*/

import mongoose from "mongoose";

type cachedMongoose = {
  conn: typeof mongoose | null;
  promise: typeof mongoose | null;
};

type GlobalThis = typeof globalThis & {
  mongoose: cachedMongoose;
};

const globalWithMongoose = global as GlobalThis;

const MONGO_URI = process.env.MONGO_URI;

// Configuration to manage connection pooling and timeouts
const options = {
  bufferCommands: false,
  maxPoolSize: 1,
  minPoolSize: 1,
  serverSelectionTimeoutMS: 5000, // Fail fast if no server is found
  socketTimeoutMS: 30000, // Socket idle timeout
  heartbeatFrequencyMS: 10000, // Ping server every 10 seconds
  maxIdleTimeMS: 10000, // Reap idle connections after 10 seconds
  waitQueueTimeoutMS: 5000 // Timeout for connection queue
};

// TODO: Set global mongoose instance only if not in production
async function connectToDbClient() {
  try {
    if (!MONGO_URI) {
      throw new Error('Invalid/Missing environment variable: "MONGO_URI"');
    }

    // check if mongoose connection is already cached
    let cached = globalWithMongoose.mongoose;
    if (!cached) {
      cached = globalWithMongoose.mongoose = { conn: null, promise: null };
    }

    if (cached.conn) {
      console.log("💾 Cached mongoose connection is called!");
      return cached.conn;
    }

    if (!cached.promise) {
      mongoose.set("strictQuery", true);
      cached.promise = await mongoose.connect(MONGO_URI, options);
      console.log("✅ Successfully connected to database");
    }

    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    console.error("🚨 Failed to connect to database: ", error);
    process.exit(1);
  }
}

export default connectToDbClient;
