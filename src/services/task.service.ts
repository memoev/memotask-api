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

const completeTask = async (input : String) => {
  try {
    return await TaskModel.findByIdAndUpdate(input, { completed: true }, { new: true });
  } catch (error: any) {
    throw new Error(error);
  }
}

const toggleCompletedTaskProperty = async (input : String) => {
  try {
    const task: TaskDocument | null =  await TaskModel.findById(input);
    if (task) task.completed = !task.completed;
    return await task?.save();
  } catch (error: any) {
    throw new Error(error);
  }
}

const updateTaskDescription = async (
  input : String,
  payload: DocumentDefinition<Omit<TaskDocument, 'completed' | 'createdAt' | 'updatedAt'>>
) => {
  try {
    return await TaskModel.findByIdAndUpdate(input, payload, { new: true })
  } catch (error: any) {
    throw new Error(error);
  }
}

const deleteTask = async (input: String) => {
  try {
    return await TaskModel.findByIdAndDelete(input)
  } catch (error: any) {
    throw new Error(error);
  }
}

export {
  getAllTasks,
  getTaskById,
  createTask,
  completeTask,
  toggleCompletedTaskProperty,
  updateTaskDescription,
  deleteTask,
}
