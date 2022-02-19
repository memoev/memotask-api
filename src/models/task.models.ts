import mongoose, {} from "mongoose";

export interface TaskDocument extends mongoose.Document {
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new mongoose.Schema({
  description: {type: String, required: true},
  completed: {type: Boolean,require: true, default: false}
}, {
  timestamps: true,
});

const TaskModel = mongoose.model('Task', taskSchema);

export default TaskModel;