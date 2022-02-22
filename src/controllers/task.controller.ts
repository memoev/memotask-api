import { Request, Response } from "express";
import { CreateTaskInput } from "../schema/task.schema";
import { createTask } from "../services/task.service";
import log from "../utils/logger";

const createTaskHandler = async (req: Request<{}, {}, CreateTaskInput["body"]>, res: Response) => {
  try {
    const task = await createTask(req.body);
    log.info('Task %o has been created', task);
    return res.status(200).send(task);
  } catch (error: any) {
    log.error('There has been an error creating task: %o', error);
    return res.status(409).send(error.message);
  };
};

export {
  createTaskHandler,
};