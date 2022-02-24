import { Express, Request, Response, NextFunction } from "express";
import { 
  getAllTaskHandler,
  createTaskHandler,
  getTaskByIdHandler,
  toggleCompletedTaskPropertyByIdHandler,
  updateTaskDescriptionByIdHandler,
  deleteTaskByIdHandler,
} from "./controllers/task.controller";
import validateResource from "./middleware/validateResource";
import { createTaskSchema, getTaskSchema } from "./schema/task.schema";

const routes = (app: Express) => {
  app.get('/healthcheck', (req: Request, res: Response, next: NextFunction) => {
    res.sendStatus(200);
  });

  app.get('/api/tasks', getAllTaskHandler);

  app.get('/api/tasks/:_id', validateResource(getTaskSchema), getTaskByIdHandler);

  app.post('/api/tasks', validateResource(createTaskSchema), createTaskHandler);

  app.put(
    '/api/tasks/toggle-complete/:_id',
    validateResource(getTaskSchema),
    toggleCompletedTaskPropertyByIdHandler
  );

  app.put(
    '/api/tasks/:_id',
    [validateResource(getTaskSchema),validateResource(createTaskSchema)],
    updateTaskDescriptionByIdHandler
  )

  app.delete('/api/tasks/:_id', validateResource(getTaskSchema), deleteTaskByIdHandler);
}

export default routes;
