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
      cached.promise = await mongoose.connect(MONGO_URI);
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
