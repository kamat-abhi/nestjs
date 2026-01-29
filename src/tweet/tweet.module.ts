import { Module } from '@nestjs/common';
import { TweetController } from './tweet.controller';
import { TweetService } from './tweet.service';
import { UserModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tweet } from './tweet.entity';
import { HashtagModule } from '../hashtag/hashtag.module';
import { PaginationModule } from '../common/pagination/pagination.module';

@Module({
  controllers: [TweetController],
  providers: [TweetService],
  imports: [
    UserModule,
    HashtagModule,
    PaginationModule,
    TypeOrmModule.forFeature([Tweet]),
  ],
})
export class TweetModule {}
