import {
  HttpException,
  HttpStatus,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserAlreadyExistException } from '../CustomExceptions/user-already-exist.exception';
import { PaginationProvider } from '../common/pagination/pagination.provider';
import { PaginationQueryDto } from '../common/pagination/dto/pagination-query.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly paginationProvider: PaginationProvider,
  ) {}

  public async getAllUsers(paginationDto: PaginationQueryDto) {
    try {
      return await this.paginationProvider.paginateQuery(
        paginationDto,
        this.userRepository,
        undefined,
        { profile: true },
      );
    } catch (error) {
      if (
        error instanceof Error &&
        'code' in error &&
        error.code === 'ECONNREFUSED'
      ) {
        throw new RequestTimeoutException(
          'An error has occured, pleaase try again',
          { description: 'Could not connect the database' },
        );
      }
    }
  }

  public async getUserById(id: number) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'the user not found',
          table: 'user',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }

  public async createUser(userDto: CreateUserDto) {
    try {
      const existingUserName = await this.userRepository.findOne({
        where: { userName: userDto.userName },
      });
      if (existingUserName) {
        throw new UserAlreadyExistException('userName', userDto.userName);
      }

      const existingEmail = await this.userRepository.findOne({
        where: { email: userDto.email },
      });
      if (existingEmail) {
        throw new UserAlreadyExistException('Email', userDto.email);
      }

      userDto.profile = userDto.profile ?? {};
      const user = this.userRepository.create(userDto);
      return this.userRepository.save(user);
    } catch (error) {
      if (
        error instanceof Error &&
        'code' in error &&
        error.code === 'ECONNREFUSED'
      ) {
        throw new RequestTimeoutException(
          'An error has occured, pleaase try again',
          { description: 'Could not connect the database' },
        );
      }
      throw error;
    }
  }

  public async deleteUser(id: number) {
    await this.userRepository.delete(id);
    return 'user has been deleted ';
  }
}
