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
    return this.userRepository.find();
  }

  getUserById() {}

  public async createUser(userDto: CreateUserDto) {
    //Validate if a user exist with the given email
    const user = await this.userRepository.findOne({
      where: { email: userDto.email },
    });

    //Handle the error / exeception
    if (user) {
      return 'this user with the given eamil already exist';
    }
    //Create that user
    let newUser = this.userRepository.create(userDto);
    newUser = await this.userRepository.save(newUser);
    return newUser;
  }
}
