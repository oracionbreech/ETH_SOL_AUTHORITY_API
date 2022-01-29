import request from 'supertest';
import app from '../../src/index';
const server = request(app);

describe('Get All Flowers', () => {
  it('should get all flowers easily', async () => {
    const { body } = await server.get('/flowers').send().expect(200);
    expect(body).toBeDefined();
  });
});
