import { Injectable } from '@nestjs/common';
import { UserService } from '../users/users.service';

@Injectable()
export class TweetService {
  constructor(private readonly userService: UserService) {}

  tweets: { text: string; date: Date; userId: number }[] = [
    { text: 'hello', date: new Date('2026-01-11'), userId: 1 },
    { text: 'world', date: new Date('2035-2-13'), userId: 2 },
    { text: 'abhi', date: new Date('2349-3-3'), userId: 1 },
    { text: 'shek', date: new Date('2345-12-12'), userId: 2 },
  ];

  getTweets(userId: number) {
    const user = this.userService.getUserById(userId);
    return this.tweets
      .filter((tweet) => tweet.userId === userId)
      .map((tweet) => ({
        text: tweet.text,
        date: tweet.date,
        name: user?.name,
      }));
  }
}
