import { UUIDEntity } from 'src/modules/common/entities/base-entity';
import { Column, Entity, Index } from 'typeorm';

@Entity({
  name: 'user_favorites',
})
@Index(['userId', 'movieId'], { unique: true, where: '"deleted_at" IS NULL' })
export class UserFavoriteEntity extends UUIDEntity {
  @Column('uuid')
  userId: string;

  @Column({ nullable: true })
  backdrop_path?: string;

  @Column('text', { array: true })
  genre_ids: number[];

  @Column()
  movieId: number;

  @Column()
  original_language: string;

  @Column({ nullable: true })
  original_title?: string;

  @Column()
  overview: string;

  @Column('float4')
  popularity: number;

  @Column({ nullable: true })
  poster_path?: string;

  @Column({ nullable: true })
  release_date?: string;

  @Column({ nullable: true })
  title?: string;

  @Column({ nullable: true })
  video?: boolean;

  @Column('float4')
  vote_average: number;

  @Column()
  vote_count: number;
}
