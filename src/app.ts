import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { authenticationMiddleware, errorHandlerMiddleware } from './middleware/authentication.middleware';
import { postCart, getCart, putCart, postCartCheckout } from './controllers/cart.controller';
import { getProduct, getProducts } from './controllers/product.controller';
import 'reflect-metadata';

const app = express();
const router = express.Router();

app.use(cors())
app.use(express.json());
app.use(bodyParser.json());
app.use(authenticationMiddleware);

router.post('/api/profile/cart', postCart);
router.get('/api/profile/cart',  getCart);
router.put('/api/profile/cart',  putCart);
router.post('/api/profile/cart/checkout',  postCartCheckout);

router.get('/api/products',  getProducts);
router.get('/api/products/:productId',  getProduct);
app.use(router)
app.use(errorHandlerMiddleware);

export default app;
