import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { TweetService } from './tweet.service';
import { CreateTweetDto } from './dtos/create-tweet.dto';
import { UpdateTweetDto } from './dtos/update-tweet.dto';

@Controller('tweet')
export class TweetController {
  constructor(private readonly tweetService: TweetService) {}

  @Post()
  public CreateTweet(@Body() tweet: CreateTweetDto) {
    return this.tweetService.createTweet(tweet);
  }

  @Get(':userId')
  public GetTweets(@Param('userId', ParseIntPipe) userId: number) {
    return this.tweetService.getTweets(userId);
  }

  @Patch()
  public UpdateTweet(@Body() tweet: UpdateTweetDto) {
    return this.tweetService.updateTweet(tweet);
  }

  @Delete(':id')
  public async DeleteTweet(@Param('id', ParseIntPipe) id: number) {
    return await this.tweetService.deleteTweet(id);
  }
}
