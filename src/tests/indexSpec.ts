import supertest from 'supertest';
import app from '../index';

const testRequest = supertest(app);

describe('Test the resize route', () => {
  it("Should return status code of 200 if it's resized", async () => {
    const testResponse = await testRequest.get(
      '/resize?filename=icelandwaterfall&width=600&height=500'
    );
    expect(testResponse.statusCode).toBe(200);
  });
});
