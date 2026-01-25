import { Injectable } from '@nestjs/common';
import { UserService } from '../users/users.service';
import { Repository } from 'typeorm';
import { Tweet } from './tweet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTweetDto } from './dtos/create-tweet.dto';

@Injectable()
export class TweetService {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(Tweet)
    private readonly tweetRepository: Repository<Tweet>,
  ) {}

  public async createTweet(createTweetDto: CreateTweetDto) {
    const user = await this.userService.getUserById(createTweetDto.userId);

    if (user) {
      const tweet = this.tweetRepository.create({
        ...createTweetDto,
        user: user,
      });
      return await this.tweetRepository.save(tweet);
    }
  }

  public async getTweets(userId: number) {
    return await this.tweetRepository.find({
      where: {
        user: { id: userId },
      },
      relations: { user: true },
    });
  }
}
