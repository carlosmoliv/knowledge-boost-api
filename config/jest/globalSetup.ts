import { MongoMemoryServer } from "mongodb-memory-server";
import { mongoConfig } from "../../utils/mongo.utils";
import * as database from "../database";

export = async function globalSetup() {
  if (mongoConfig.Memory) {
    const instance = await MongoMemoryServer.create();
    const uri = instance.getUri();

    (global as any).__MONGOINSTANCE = instance;
    process.env.MONGO_URI = uri.slice(0, uri.lastIndexOf("/"));
  } else {
    process.env.MONGO_URI = `mongodb://${mongoConfig.IP}:${mongoConfig.Port}`;
  }

  await database.connect(`${process.env.MONGO_URI}/${mongoConfig.Database}`);
  await database.dropDatabase();
  await database.disconnect();
};
