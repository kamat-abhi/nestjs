import { Injectable } from '@nestjs/common';
import { UserService } from '../users/users.service';
import { CreateUserDto } from '../users/dtos/create-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  public async signup(createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }
}
