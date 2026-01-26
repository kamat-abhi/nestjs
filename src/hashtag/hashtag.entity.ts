import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tweet } from '../tweet/tweet.entity';

@Entity()
export class HashTag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'text',
    nullable: false,
    unique: true,
  })
  name: string;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToMany(() => Tweet, (tweet) => tweet.hashtags, { onDelete: 'CASCADE' })
  tweets: Tweet[];
}
