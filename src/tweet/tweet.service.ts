import { Injectable } from '@nestjs/common';
import { UserService } from '../users/users.service';

@Injectable()
export class TweetService {
  constructor(private readonly userService: UserService) {}
}
