import { Express, Request, Response, NextFunction } from "express";
import { createTaskHandler } from "./controllers/task.controller";
import validateResource from "./middleware/validateResource";
import { createTaskSchema } from "./schema/task.schema";

const routes = (app: Express) => {
  app.get('/healthcheck', (req: Request, res: Response, next: NextFunction) => {
    res.sendStatus(200);
  });

  app.post('/api/tasks', validateResource(createTaskSchema), createTaskHandler);
}

export default routes;