import { OrderEntity } from '../entities/order.entity';

export class OrderRepository {
    private orders: OrderEntity[] = [];

    findById(orderId: string): OrderEntity | undefined {
        return this.orders.find(order => order.id === orderId);
    }

    findByUserId(userId: string): OrderEntity[] {
        return this.orders.filter(order => order.userId === userId);
    }

    create(order: OrderEntity): OrderEntity {
        this.orders.push(order);
        return order;
    }

    update(orderId: string, updatedOrder: OrderEntity): OrderEntity {
        const index = this.orders.findIndex(order => order.id === orderId);
        if (index === -1) {
            throw new Error('Order not found');
        }
        this.orders[index] = updatedOrder;
        return updatedOrder;
    }

    delete(orderId: string): void {
        const index = this.orders.findIndex(order => order.id === orderId);
        if (index !== -1) {
            this.orders.splice(index, 1);
        }
    }
}

export default new OrderRepository()
