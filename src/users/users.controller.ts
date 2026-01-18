import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UserService } from './users.service';

@Controller('users')
export class UsersController {
  @Get()
  getUsers(@Query() query: any) {
    const userService = new UserService();
    console.log(query);
    return userService.getAllUsers();
  }

  @Get(':id')
  gutUserById(@Param('id') id: any) {
    console.log(id);
    const userService = new UserService();
    return userService.getUserById(+id);
  }

  @Post()
  createUser() {
    const user = {
      id: 3,
      name: 'abbhi',
      age: 25,
      gender: 'male',
      isMarried: false,
    };
    const userService = new UserService();
    userService.createUser(user);
    return `A new user is created ${JSON.stringify(user)}`;
  }
}
