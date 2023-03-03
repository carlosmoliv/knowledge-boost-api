import { MongoMemoryServer } from "mongodb-memory-server";
import { mongoConfig } from "../../utils/mongo.utils";

export = async function globalTeardown() {
  if (mongoConfig.Memory) {
    const instance: MongoMemoryServer = (global as any).__MONGOINSTANCE;
    await instance.stop();
  }
};
