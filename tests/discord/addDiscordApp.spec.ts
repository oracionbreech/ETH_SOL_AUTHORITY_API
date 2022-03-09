import request from 'supertest';
import app from '../../src/index';
const server = request(app);

describe('Add discord app', () => {
  it('should add discord app', async () => {
    const { body } = await server
      .post('/discord/add')
      .send({
        name: 'random name',
        secretKey: 'random secret key',
        clientId: 'random client id'
      })
      .expect(200);
    expect(body).toBeDefined();
  });
});
