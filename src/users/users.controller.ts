import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUserParamDto } from './dtos/get-user-param.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    console.log(limit);
    return this.userService.getAllUsers();
  }

  @Get(':isMarried')
  getUser(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Param() param: GetUserParamDto,
  ) {
    console.log(limit);
    console.log(param);
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

  @Patch()
  updateUser(@Body() user: UpdateUserDto) {
    console.log(user);
    return 'updated user successfully';
  }
}
