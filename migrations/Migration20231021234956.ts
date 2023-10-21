import { Migration } from '@mikro-orm/migrations';
import { ProductEntity } from '../src/entities/product.entity';
import { productsdata } from '../src/__test__/data/data';

export class Migration20231021234956 extends Migration {

  public async up(): Promise<void> {
    await this.em.nativeInsert(ProductEntity, productsdata);
  }

  public async down(): Promise<void> {
    const productIds = productsdata.map(i => i.id)

    await this.em.nativeDelete(ProductEntity, { id: { $in: productIds } });
  }
}
