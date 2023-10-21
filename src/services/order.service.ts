import { OrderEntity } from '../entities/order.entity';
import cartRepo from '../repositories/cart.repository';
import productRepository from '../repositories/product.repository';
import { v4 as uuidv4 } from 'uuid';

class OrderService {
  checkout(userId: string): OrderEntity {

    const cart = cartRepo.findByUserId(userId);
    if (!cart || cart.items.length === 0) {
      throw new Error('Cart is empty or not found');
    }

    const itemDetails = cart.items.map(item => {
      const product = productRepository.findById(item.product.id);
      if(!product)
        throw new Error(`Product with product id ${item.product.id} not found`)
      return {
        product: {
          id: product.id,
          title: product.title,
          description: product.description,
          price: product.price
        },
        count: item.count
      };
    });
    const totalPrice = itemDetails.reduce((acc, item) => acc + (item.product.price * item.count), 0);
    const orderDetails: OrderEntity = {
      id: uuidv4(),
      userId: userId,
      cartId: cart.id,
      items: itemDetails,
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
      total: totalPrice
    };

    cartRepo.empty(userId);

    return orderDetails;
  }
}

export default new OrderService()
