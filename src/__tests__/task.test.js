const supertest = require('supertest');
const { default: createServer } = require('../utils/server');
const TaskService = require('../services/task.service')

const app = createServer();

describe('task', () => {
  const taskPayload = {
    __v: 0,
    description: "Fake Description for Test",
    completed: false,
  };

  const taskInput = {
    description: "Fake Description for Test"
  };

  describe('post task api', () => {
    describe('given the task got created', () => {
      it('should return a 200', async () => {
        const createTaskServiceMock = jest
          .spyOn(TaskService, 'createTask')
          .mockReturnValueOnce(taskPayload);

        const { statusCode, body } = await supertest(app)
          .post('/api/tasks')
          .send(taskInput);

        expect(body).toEqual(taskPayload);
        expect(createTaskServiceMock).toBeCalledWith(taskInput);
        expect(statusCode).toBe(200);
      });
    });
  });
});