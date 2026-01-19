import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { TweetService } from './tweet.service';

@Controller('tweet')
export class TweetController {
  constructor(private readonly tweetService: TweetService) {}

  @Get(':userId')
  GetTweets(@Param('userId', ParseIntPipe) userId: number) {
    console.log(typeof userId);
    return this.tweetService.getTweets(userId);
  }
}
