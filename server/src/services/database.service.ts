import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

export const collections: { users?: mongoDB.Collection } = {};

export default async function connectToDatabase() {
  dotenv.config();

  const dbConnString = process.env.DB_CONN_STRING;
  const dbName = process.env.DB_NAME;
  const usersCollectionName = process.env.USERS_COLLECTION_NAME;

  if (!dbConnString || !dbName || !usersCollectionName) {
    throw new Error(
      "Missing required environment variables: DB_CONN_STRING, DB_NAME, or USERS_COLLECTION_NAME"
    );
  }

  try {
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(dbConnString);
    await client.connect();

    const db: mongoDB.Db = client.db(dbName);
    const usersCollection: mongoDB.Collection =
      db.collection(usersCollectionName);
    collections.users = usersCollection;

    console.log(
      `Successfully connected to database: ${db.databaseName} and collection: ${usersCollection.collectionName}`
    );
  } catch (error) {
    console.error("Error connecting to database:", error);
    throw new Error("Database connection failed");
  }
}
