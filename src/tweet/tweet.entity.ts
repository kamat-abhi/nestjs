import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { HashTag } from '../hashtag/hashtag.entity';

@Entity()
export class Tweet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'text',
    nullable: false,
  })
  text: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  image?: string;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.tweets)
  user: User;

  @ManyToMany(() => HashTag)
  @JoinTable()
  hashtags: HashTag[];
}
