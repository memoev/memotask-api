import { DocumentDefinition } from 'mongoose';
import TaskModel, { TaskDocument } from '../models/task.models';

const createTask = async (input: DocumentDefinition<Omit<TaskDocument, 'completed' | 'createdAt' | 'updatedAt'>>) => {
  try {
    return await TaskModel.create(input);
  } catch (error: any) {
    throw new Error(error);
  }
}

export {
  createTask,
}
