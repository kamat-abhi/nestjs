import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../users/users.service';
import { Repository } from 'typeorm';
import { Tweet } from './tweet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTweetDto } from './dtos/create-tweet.dto';
import { HashtagService } from '../hashtag/hashtag.service';
import { UpdateTweetDto } from './dtos/update-tweet.dto';

@Injectable()
export class TweetService {
  constructor(
    private readonly userService: UserService,
    private readonly hashtagService: HashtagService,
    @InjectRepository(Tweet)
    private readonly tweetRepository: Repository<Tweet>,
  ) {}

  public async createTweet(createTweetDto: CreateTweetDto) {
    const user = await this.userService.getUserById(createTweetDto.userId);

    const hashtags = await this.hashtagService.findHashtag(
      createTweetDto.hashtags ?? [],
    );

    if (user) {
      const tweet = this.tweetRepository.create({
        ...createTweetDto,
        user,
        hashtags,
      });
      return await this.tweetRepository.save(tweet);
    }
  }

  public async getTweets(userId: number) {
    return await this.tweetRepository.find({
      where: {
        user: { id: userId },
      },
      relations: { user: true, hashtags: true },
    });
  }

  public async updateTweet(updateTweetDto: UpdateTweetDto) {
    const tweet = await this.tweetRepository.findOneBy({
      id: updateTweetDto.id,
    });

    if (!tweet) {
      throw new NotFoundException('Tweet not found');
    }

    if (updateTweetDto.text !== undefined) {
      tweet.text = updateTweetDto.text;
    }

    if (updateTweetDto.image !== undefined) {
      tweet.image = updateTweetDto.image;
    }

    if (updateTweetDto.hashtags !== undefined) {
      const hashtags = await this.hashtagService.findHashtag(
        updateTweetDto.hashtags,
      );
      tweet.hashtags = hashtags;
    }

    return await this.tweetRepository.save(tweet);
  }
}
