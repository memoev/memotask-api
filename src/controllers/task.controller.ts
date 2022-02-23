import { Request, Response } from "express";
import { CreateTaskInput, GetTaskInput } from "../schema/task.schema";
import { getAllTasks, getTaskById, createTask } from "../services/task.service";
import log from "../utils/logger";

const getAllTaskHandler = async (req: Request<{}, {}, CreateTaskInput["body"]>, res: Response) => {
  try {
    const allTasks = await getAllTasks();
    return res.status(200).send(allTasks);
  } catch (error: any) {
    return res.status(400).send(error.message);
  }
}

const getTaskByIdHandler = async (req: Request<GetTaskInput["params"]>, res: Response) => {
  try {
    const taskId = req.params._id;
    const task = await getTaskById(taskId);
    return res.status(200).send(task);
  } catch (error: any) {
    return res.status(400).send(error.message);
  }
}

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
  getAllTaskHandler,
  getTaskByIdHandler,
  createTaskHandler,
};