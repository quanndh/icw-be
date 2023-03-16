import { UUIDEntity } from 'src/modules/common/entities/base-entity';
import { Column, Entity, Index } from 'typeorm';

@Entity({
  name: 'users',
})
@Index(['email'], { unique: true, where: '"deleted_at" IS NULL' })
export class UserEntity extends UUIDEntity {
  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  passwordSalt: string;
}
