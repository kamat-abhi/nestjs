import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../users/users.service';
import { Repository } from 'typeorm';
import { Tweet } from './tweet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTweetDto } from './dtos/create-tweet.dto';
import { HashtagService } from '../hashtag/hashtag.service';
import { UpdateTweetDto } from './dtos/update-tweet.dto';
import { PaginationQueryDto } from '../common/pagination/dto/pagination-query.dto';
import { PaginationProvider } from '../common/pagination/pagination.provider';

@Injectable()
export class TweetService {
  constructor(
    private readonly userService: UserService,
    private readonly hashtagService: HashtagService,
    @InjectRepository(Tweet)
    private readonly tweetRepository: Repository<Tweet>,
    private readonly paginationProvider: PaginationProvider,
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

  public async getTweets(userId: number, paginationDto: PaginationQueryDto) {
    const user = await this.userService.getUserById(userId);

    if (!user) {
      throw new NotFoundException(`User with userId ${userId} is  not found`);
    }

    return await this.paginationProvider.paginateQuery(
      paginationDto,
      this.tweetRepository,
      { user: { id: userId } },
    );
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

  public async deleteTweet(id: number) {
    await this.tweetRepository.delete({ id });
    return { deleted: true, id };
  }
}
