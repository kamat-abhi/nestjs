import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  getAllUsers() {
    return this.userRepository.find({
      relations: {
        profile: true,
      },
    });
  }

  getUserById() {}

  public async createUser(userDto: CreateUserDto) {
    //let profile: Profile | undefined;
    userDto.profile = userDto.profile ?? {};

    const user = this.userRepository.create(userDto);

    return this.userRepository.save(user);
  }

  public async deleteUser(id: number) {
    await this.userRepository.delete(id);
    return 'user has been deleted ';
  }
}
