import { ProductEntity, UserEntity, CartEntity, CartItemEntity, OrderEntity } from './path-to-your-entities';
import { MikroORM } from '@mikro-orm/core';

const config = {
  type: 'postgresql',
  dbName: process.env.MIKRO_ORM_DB_NAME,
  user: process.env.MIKRO_ORM_USER,
  password: process.env.MIKRO_ORM_PASSWORD,
  host: process.env.MIKRO_ORM_HOST,
  port: 5432,
  entities: [ProductEntity, UserEntity, CartEntity, CartItemEntity, OrderEntity],
  autoLoadEntities: true,
  debug: process.env.NODE_ENV !== 'production',
  migrations: {
    tableName: 'mikro_orm_migrations',
    path: './migrations',
    pattern: /^[\w-]+\d+\.[tj]s$/,
    transactional: true,
    disableForeignKeys: true,
    allOrNothing: true,
    dropTables: true,
    safe: false,
    emit: 'ts',
  },
};

export default config as Parameters<typeof MikroORM.init>[0];
