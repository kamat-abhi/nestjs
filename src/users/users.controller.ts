import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './users.service';
import { PaginationQueryDto } from '../common/pagination/dto/pagination-query.dto';
import { AuthorizeGuard } from '../auth/guards/authorize.guards';

@Controller('users')
@UseGuards(AuthorizeGuard)
export class UsersController {
  constructor(private readonly userService: UserService) {}

  // @Post()
  // createUser(@Body() user: CreateUserDto) {
  //   return this.userService.createUser(user);
  // }

  @Get()
  getAllUser(@Query() paginationDto: PaginationQueryDto) {
    return this.userService.getAllUsers(paginationDto);
  }

  @Get(':id')
  getAllUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUserById(id);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }
}
