import { Entity, OneToOne, PrimaryKey } from '@mikro-orm/core';
import { CartEntity } from './cart.entity';

@Entity()
export class UserEntity {
  @PrimaryKey()
  id: string; // uuid

  @OneToOne(() => CartEntity, cart => cart.user)
  cart: CartEntity;
}

