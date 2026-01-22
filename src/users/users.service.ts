import { Injectable } from '@nestjs/common';
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
    private ProfileRepository: Repository<Profile>,
  ) {}

  getAllUsers() {
    return this.userRepository.find();
  }

  getUserById() {}

  public async createUser(userDto: CreateUserDto) {
    let profile: Profile | undefined;

    if (userDto.profile) {
      profile = this.ProfileRepository.create(userDto.profile);
      await this.ProfileRepository.save(profile);
    }

    const user = this.userRepository.create({
      email: userDto.email,
      userName: userDto.userName,
      password: userDto.password,
      profile: profile,
    });

    return this.userRepository.save(user);
  }
}
