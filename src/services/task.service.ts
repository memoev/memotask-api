import { DocumentDefinition } from 'mongoose';
import TaskModel, { TaskDocument } from '../models/task.models';

const getAllTasks = async () => {
  try {
    return await TaskModel.find();
  } catch (error: any) {
    throw new Error(error);
  }
}

const getTaskById = async (input : String) => {
  try {
    return await TaskModel.findById(input);
  } catch (error: any) {
    throw new Error(error);
  }
}

const createTask = async (input: DocumentDefinition<Omit<TaskDocument, 'completed' | 'createdAt' | 'updatedAt'>>) => {
  try {
    return await TaskModel.create(input);
  } catch (error: any) {
    throw new Error(error);
  }
}

export {
  getAllTasks,
  getTaskById,
  createTask,
}
