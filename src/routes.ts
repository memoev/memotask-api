import { Express, Request, Response, NextFunction } from "express";
import { createTaskHandler } from "./controllers/task.controller";

const routes = (app: Express) => {
  app.get('/healthcheck', (req: Request, res: Response, next: NextFunction) => {
    res.sendStatus(200);
  });

  app.post('/api/tasks', createTaskHandler);
}

export default routes;