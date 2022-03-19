import express from "express";
import cors from "cors";
import routes from "../routes";

const createServer = () => {
  const app = express();
  app.use(express.json());
  app.use(cors());
  routes(app);
  return app;
}

export default createServer;