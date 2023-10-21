import { Entity, PrimaryKey, Property, OneToMany, ManyToOne } from '@mikro-orm/core';
import { ProductEntity } from './product.entity';

@Entity()
export class CartItemEntity {
  @ManyToOne(() => ProductEntity)
  product: ProductEntity;

  @Property()
  count: number;
}

@Entity()
export class CartEntity {
  @PrimaryKey()
  id: string;

  @Property()
  userId: string;

  @Property({ default: false })
  isDeleted?: boolean;

  @OneToMany(() => CartItemEntity, cartItem => cartItem.product)
  items: CartItemEntity[];
}
