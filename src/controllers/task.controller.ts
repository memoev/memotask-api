import { Request, Response } from "express";
import { CreateTaskInput, GetTaskInput } from "../schema/task.schema";
import { 
  getAllTasks,
  getTaskById,
  createTask,
  completeTask,
  updateTaskDescription,
  deleteTask,
} from "../services/task.service";
import log from "../utils/logger";

const getAllTaskHandler = async (req: Request, res: Response) => {
  try {
    const allTasks = await getAllTasks();
    log.info('List %o of tasks has been retrieved', allTasks);
    return res.status(200).send(allTasks);
  } catch (error: any) {
    log.error('There has been an error in %s: %o', getAllTaskHandler.name, error);
    return res.status(400).send(error.message);
  }
}

const getTaskByIdHandler = async (req: Request<GetTaskInput["params"]>, res: Response) => {
  try {
    const taskId = req.params._id;
    const task = await getTaskById(taskId);

    if (!task) {
      log.info(
        'Request for %s could not be completed because id %s was not found',
        getTaskByIdHandler.name,
        taskId
      );
      return res.sendStatus(404);
    }

    log.info('Task %o has been retrieved', task);
    return res.status(200).send(task);
  } catch (error: any) {
    log.error('There has been an error in %s: %o', getTaskByIdHandler.name, error);
    return res.status(400).send(error.message);
  }
}

const createTaskHandler = async (req: Request<{}, {}, CreateTaskInput["body"]>, res: Response) => {
  try {
    const task = await createTask(req.body);
    log.info('Task %o has been created', task);
    return res.status(200).send(task);
  } catch (error: any) {
    log.error('There has been an error in %s: %o', createTaskHandler.name, error);
    return res.status(400).send(error.message);
  };
};

const completeTaskByIdHandler = async (req: Request<GetTaskInput["params"]>, res: Response) => {
  try {
    const taskId = req.params._id;
    const completedTask = await completeTask(taskId);

    if (!completedTask) {
      log.info(
        'Request for %s could not be completed because id %s was not found',
        completeTaskByIdHandler.name,
        taskId
      );
      return res.status(404).send(`Task with _id ${taskId} was Not Found.`);
    }

    log.info('Task %o has been completed', completedTask);
    return res.status(200).send(completedTask);
  } catch (error: any) {
    log.error('There has been an error in %s: %o', completeTaskByIdHandler.name, error);
    return res.status(409).send(error.message);
  }
}

const updateTaskDescriptionByIdHandler = async (
  req: Request<GetTaskInput["params"], {}, CreateTaskInput["body"]>,
  res: Response
) => {
  try {
    const taskId = req.params._id;
    const taskPayload = req.body;
    const modifiedTask = await updateTaskDescription(taskId, taskPayload);

    if (!modifiedTask) {
      log.info(
        'Request for %s could not be completed because id %s was not found',
        updateTaskDescriptionByIdHandler.name,
        taskId
      );
      return res.status(404).send(`Task with _id ${taskId} was Not Found.`);
    }

    log.info('Task description for %o has been updated', modifiedTask);
    return res.status(200).send(modifiedTask);
  } catch (error: any) {
    log.error('There has been an error in %s: %o', updateTaskDescriptionByIdHandler.name, error);
    return res.status(409).send(error.message);
  }
}

const deleteTaskByIdHandler = async (req: Request<GetTaskInput["params"]>, res: Response) => {
  try {
    const taskId = req.params._id;
    const deletedTask = await deleteTask(taskId);

    if (!deletedTask) {
      log.info(
        'Request for %s could not be completed because id %s was not found',
        deleteTaskByIdHandler.name,
        taskId
      );
      return res.status(404).send(`Task with _id ${taskId} was Not Found.`);
    }

    log.info('Task %o has been deleted', deletedTask);
    return res.status(200).send(deletedTask);
  } catch (error: any) {
    log.error('There has been an error in %s: %o', deleteTaskByIdHandler.name, error);
    return res.status(400).send(error.message);
  }
}

export {
  getAllTaskHandler,
  getTaskByIdHandler,
  createTaskHandler,
  completeTaskByIdHandler,
  updateTaskDescriptionByIdHandler,
  deleteTaskByIdHandler,
};