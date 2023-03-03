import * as database from "../database";

beforeAll(async () => {
  await database.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await database.disconnect();
});
