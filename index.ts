import express from "express";
import { initializeFlagRouter } from "./routes/FlagRouter";

import mongodb from "mongodb";
import dotenv from "dotenv";

dotenv.config();

run();

async function run() {
  const db = await initializeDb();

  const app = express();

  app.use(express.json());
  app.use(
    "/flags",
    initializeFlagRouter({
      db,
    })
  );

  app.listen(3000);
}

let db = null;

export async function initializeDb() {
  const url = process.env.DB_URL as string;
  const client = await mongodb.MongoClient.connect(url);
  db = client.db();

  return db;
}
