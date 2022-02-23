import { object, string, TypeOf } from "zod";

export const createTaskSchema = object({
  body: object({
    description: string({
      required_error: 'Description is required.'
    }).min(1, 'Description must not be empty.'),
  })
})

export const getTaskSchema = object({
  params: object({
    _id: string({
      required_error: 'ID is required.'
    })
  })
})

export type CreateTaskInput = Omit<TypeOf<typeof createTaskSchema>, 'createdAt' | 'updatedAt | completed'>;
export type GetTaskInput = TypeOf<typeof getTaskSchema>;