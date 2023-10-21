import cartRepo from '../repositories/cart.repository';
import productRepo from '../repositories/product.repository';
import { Cart, CartEntity } from '../entities/cart.entity';

export class CartService {

  createCart(userId: string): Cart {
    const cart = cartRepo.create(userId);
    return {cart, totalPrice: 0};
  }

  getOrCreateCart(userId: string): Cart {

    let cart = cartRepo.findByUserId(userId);
    if (!cart)
      return this.createCart(userId);

    const {items} = cart
    const totalPrice = items.reduce((total, item) => {
      total += item.product.price;
      return total
    }, 0)


    return {cart, totalPrice};
  }

  updateCart(userId: string, updatedCart: CartEntity): CartEntity | undefined {

    for (const item of updatedCart.items) {
      const product = productRepo.findById(item.product.id);
      if (!product) {
        throw new Error(`Product with ID ${ item.product.id } not found`);
      }
    }

    return cartRepo.update(userId, updatedCart);
  }

  emptyCart(userId: string): any {
    let cart = cartRepo.findByUserId(userId);
    if (!cart)
      throw new Error()
    cartRepo.empty(userId)
    return {"status": true};
  }

}

export default new CartService()
