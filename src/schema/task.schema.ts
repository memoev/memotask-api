import { boolean, object, string, TypeOf } from "zod";

export const createTaskSchema = object({
  body: object({
    description: string({
      required_error: 'Description is required.'
    }).min(1, 'Description must not be empty.'),
  })
})

export type CreateTaskInput = Omit<TypeOf<typeof createTaskSchema>, 'createdAt' | 'updatedAt | completed'>;