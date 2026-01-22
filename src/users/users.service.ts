import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { Profile } from '../profile/profile.entity';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(User)
    private profileRepository: Repository<Profile>,
  ) {}

  getAllUsers() {
    return this.userRepository.find();
  }

  getUserById() {}

  public async createUser(userDto: CreateUserDto) {
    //let profile: Profile | undefined;
    userDto.profile = userDto.profile ?? {};

    const user = this.userRepository.create(userDto);

    return this.userRepository.save(user);
  }

  public async deleteUser(id: number) {
    const user = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new NotFoundException('Please provide a valid user id');
    }
    await this.userRepository.delete(id);
    await this.profileRepository.delete(user.profile.id);
    return 'user has been deleted ';
  }
}
