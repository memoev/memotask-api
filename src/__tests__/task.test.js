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

  const badTaskInput = {
    description: null,
  }

  describe('post task api', () => {
    describe('when creating a task with description', () => {
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
    describe('when service is throwing error', () => {
      it('should return a 409', async () => {
      const createTaskServiceMock = jest
        .spyOn(TaskService, 'createTask')
        .mockRejectedValueOnce(Error);

      const { statusCode } = await supertest(app)
        .post('/api/tasks')
        .send(taskInput);

      expect(createTaskServiceMock).toHaveBeenCalled();
      expect(statusCode).toBe(409);
      })
    })
    describe('when passing invalid task description', () => {
      it('should return a 400', async () => {
      const createTaskServiceMock = jest
        .spyOn(TaskService, 'createTask')
        .mockRejectedValueOnce(taskPayload);

      const { statusCode } = await supertest(app)
        .post('/api/tasks')
        .send(badTaskInput);

      expect(createTaskServiceMock).not.toHaveBeenCalled();
      expect(statusCode).toBe(400);
      })
    })
  });
});