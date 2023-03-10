import express from "express";
import cors from "cors";

import api from "./routes";
import * as database from "../database/mongo";
import { expressLogger } from "../adapters/logger.utils";
import { errorHandler } from "./middlewares/errorHandler.middleware";

const configureExpress = () => {
  const app: express.Application = express();

  app.use(cors({ origin: "http://localhost:3000" }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use(expressLogger);
  app.use("/v1", api);
  app.use(errorHandler);

  return app;
};

export default () => database.connect().then(configureExpress);
