import { CartEntity, CartItemEntity } from '../entities/cart.entity'; // Adjust the path based on your folder structure
import { v4 as uuidv4 } from 'uuid';

export class CartRepository {
  private carts: CartEntity[] = [];

  create(userId: string): CartEntity {
    const newCart: CartEntity = {
      id: uuidv4(),
      userId: userId,
      isDeleted: false,
      items: []
    };
    this.carts.push(newCart);
    delete newCart.isDeleted
    return newCart;
  }

  findByUserId(userId: string): CartEntity | undefined {
    return this.carts.find(cart => cart.userId === userId);
  }

  update(userId: string, cart: CartEntity): CartEntity {
    const index = this.carts.findIndex(c => c.id === cart.id);
    if (index == -1)
      throw new Error('Cart not found')
    this.carts[index] = { ...this.carts[index], ...cart };
    return cart;
  }

  empty(userId: string): boolean {
    const index = this.carts.findIndex(c => c.userId === userId);
    if (index !== -1) {
      this.carts[index].items = [];
      return true;
    }
    return false;
  }

  addItemToCart(userId: string, item: CartItemEntity): boolean {
    const cart = this.findByUserId(userId);
    if (cart) {
      cart.items.push(item);
      return true;
    }
    return false;
  }

  removeItemFromCart(userId: string, productId: string): boolean {
    const cart = this.findByUserId(userId);
    if (cart) {
      const itemIndex = cart.items.findIndex(item => item.product.id === productId);
      if (itemIndex !== -1) {
        cart.items.splice(itemIndex, 1);
        return true;
      }
    }
    return false;
  }

}

export default new CartRepository();
