import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class ProductEntity {
  @PrimaryKey()
  id: string; // uuid

  @Property()
  title: string;

  @Property()
  description: string;

  @Property()
  price: number;
}


