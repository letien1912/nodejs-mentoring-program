import { Migration } from '@mikro-orm/migrations';
import { userdata } from '../src/__test__/data/data';
import { UserEntity } from '../src/entities/user.entity';

export class Migration20231021234956 extends Migration {

  public async up(): Promise<void> {
    await this.em.nativeInsert(UserEntity, userdata);
  }

  public async down(): Promise<void> {
    const user = userdata.id

    await this.em.nativeDelete(UserEntity, { id: { $in: user } });
  }
}
