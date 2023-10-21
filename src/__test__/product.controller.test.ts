import app from '../app'
import request from 'supertest'
import { productsdata } from '../entities/product.entity';
import { expect } from '@jest/globals';

describe('Product API', () => {
  let userId;

  beforeAll(() => {
    userId = 'eb5a26af-6e4c-4f31-a9b1-3450d42ac66c';
  });

  it('should get all products', async () => {
    const response = await request(app)
      .get('/api/products')
      .set('x-user-id', userId);

    expect(response.status).toBe(200);
    expect(response.body.data).toEqual([
      ...productsdata
    ]);
  });

  it('should get a product', async () => {
    const response = await request(app)
      .get(`/api/products/${productsdata[0].id}`)
      .set('x-user-id', userId);

    expect(response.status).toBe(200);
    expect(response.body.data).toEqual({
      ...productsdata[0]
    });
  });

  it('should return not found', async () => {
    const response = await request(app)
      .get(`/api/products/123`)
      .set('x-user-id', userId);

    expect(response.status).toBe(404);
  });

  it('should return 401 when x-user-id header is missing', async () => {
    const response = await request(app).get('/api/profile/cart');
    expect(response.status).toBe(401);
    expect(response.body.error.message).toBe(
      'Header x-user-id is missing or no user with such id'
    );
  });

  it('should return 400 Bad Request', async () => {
    let cartid = null
    const responseCart = await request(app)
      .post('/api/profile/cart')
      .set('x-user-id', userId);
    cartid = responseCart.body.data.cart.id

    const cartUpdate = {
      id: cartid,
      items: [
        {
          product: {...productsdata[0], title: null},
          count: 2,
        },
      ],
    };

    const response = await request(app)
      .put('/api/profile/cart')
      .set('x-user-id', userId)
      .send(cartUpdate);

    expect(response.status).toBe(400);
    expect(response.body.error.message).toBe('"items[0].product.title" must be a string');
  });
});
