import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('users')
export class UsersController {
  userService: UserService;

  constructor() {
    this.userService = new UserService();
  }
  @Get()
  getUsers(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    console.log(limit);
    return this.userService.getAllUsers();
  }

  @Get(':id')
  gutUserById(@Param('id', ParseIntPipe) id: number) {
    console.log(id);
    return this.userService.getUserById(id);
  }

  @Post()
  createUser(@Body() user: CreateUserDto) {
    //this.userService.createUser(user);
    console.log(user instanceof CreateUserDto);
    console.log(typeof user);
    return `A new user is created ${JSON.stringify(user)}`;
  }
}
