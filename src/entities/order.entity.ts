import { Entity, PrimaryKey, Property, OneToMany, ManyToOne } from '@mikro-orm/core';
import { CartItemEntity } from './cart.entity';
import { UserEntity } from './user.entity';

type ORDER_STATUS = 'created' | 'completed';

@Entity()
export class OrderEntity {
  @PrimaryKey()
  id: string; // uuid

  @ManyToOne(() => UserEntity)
  user: UserEntity;

  @Property()
  cartId: string;

  @OneToMany(() => CartItemEntity, cartItem => cartItem.product)
  items: CartItemEntity[];

  @Property()
  payment: {
    type: string,
    address?: any,
    creditCard?: any,
  };

  @Property()
  delivery: {
    type: string,
    address: any,
  };

  @Property()
  comments: string;

  @Property()
  status: ORDER_STATUS;

  @Property()
  total: number;
}
