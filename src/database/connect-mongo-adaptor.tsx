/*################################################
###### NEEDED TO CONNECT MONGODB TO AUTHJS  ######
#################################################*/

import { MongoClient, ServerApiVersion } from "mongodb";

type GlobalThis = typeof globalThis & {
  _mongoClient?: Promise<MongoClient>;
};

const MONGO_URI = process.env.MONGO_URI;

const mongoClientOptions = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
};

export default function connectMongoAdaptor() {
  // Check for required environment variables
  if (!MONGO_URI) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
  }

  // If we are in development, use the global promise
  if (process.env.VERCEL_ENV === "development") {
    const globalWithMongo = global as GlobalThis;
    globalWithMongo._mongoClient = undefined;

    // If the promise is still undefined, create a new MongoClient
    if (!globalWithMongo._mongoClient) {
      globalWithMongo._mongoClient = new MongoClient(
        MONGO_URI,
        mongoClientOptions
      ).connect();
    }

    return globalWithMongo._mongoClient;
  }

  // If we are not in development, create a new MongoClient
  return new MongoClient(MONGO_URI, mongoClientOptions).connect();
}
