import app from '../app'
import request from 'supertest'
import { productsdata } from '../entities/product.entity';
import { expect } from '@jest/globals';

describe('Cart API', () => {
  let userId;

  beforeAll(() => {
    userId = 'eb5a26af-6e4c-4f31-a9b1-3450d42ac66c';
  });

  it('should create an order', async () => {

    // Create User cart
    const newCart = await request(app)
      .post('/api/profile/cart')
      .set('x-user-id', userId);

    const cartid = newCart.body.data.cart.id
    const cartUpdate = {
      id: cartid,
      items: [
        {
          product: productsdata[0],
          count: 2,
        },
        {
          product: productsdata[1],
          count: 3,
        },
      ],
    };

    const updateCart = await request(app)
      .put('/api/profile/cart')
      .set('x-user-id', userId)
      .send(cartUpdate);


    const checkoutCart = await request(app)
      .post('/api/profile/cart/checkout')
      .set('x-user-id', userId)

    expect(checkoutCart.status).toBe(200);
    expect(checkoutCart.body.data).toMatchObject({
      order: {
        id: expect.any(String),
        userId: userId,
        cartId: cartid,
        items:[
          {
            product: productsdata[0],
            count: 2,
          },
          {
            product: productsdata[1],
            count: 3,
          },
        ],
        payment: {
          type: 'paypal',
          address: 'London',
          creditCard: '1234-1234-1234-1234'
        },
        delivery: {
          type: 'post',
          address: 'London'
        },
        comments: '',
        status: 'created',
        total: productsdata[0].price * 2 + productsdata[1].price * 3,
      }
    });
    // Add more assertions as needed
  });

  it('should update a user cart', async () => {
    let cartid = null
    const responseCart = await request(app)
      .post('/api/profile/cart')
      .set('x-user-id', userId);
    cartid = responseCart.body.data.cart.id
    const cartUpdate = {
      id: cartid,
      items: [
        {
          product: productsdata[0],
          count: 2,
        },
      ],
    };

    const response = await request(app)
      .put('/api/profile/cart')
      .set('x-user-id', userId)
      .send(cartUpdate);

    expect(response.status).toBe(200);
    expect(response.body.data.id).toBe(cartid);
    expect(response.body.data.items[0].product.id).toBe(productsdata[0].id);

  });

  it('should create a user cart', async () => {
    const response = await request(app)
      .post('/api/profile/cart')
      .set('x-user-id', userId);

    expect(response.status).toBe(201);
    expect(response.body.data.cart.id).not.toBe(null);
    expect(response.body.data.cart.items).toHaveLength(0);
    expect(response.body.data.totalPrice).toBe(0);
  });

  it('should get a user cart', async () => {
    const response = await request(app)
      .get('/api/profile/cart')
      .set('x-user-id', userId);

    expect(response.status).toBe(200);
    expect(response.body.data.cart.id).not.toBe(null);
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
