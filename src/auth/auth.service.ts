import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../users/users.service';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { HashingProvider } from './provider/hashing.provider';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly hashingProvider: HashingProvider,
  ) {}

  public async signup(createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  public async login(loginDto: LoginDto) {
    const user = await this.userService.findUserByUserName(loginDto.userName);

    let isEqual: boolean = false;
    isEqual = await this.hashingProvider.comparePassword(
      loginDto.password,
      user.password,
    );
    if (!isEqual) {
      throw new UnauthorizedException('Incorrect Password');
    }

    return {
      data: user,
      success: true,
      message: 'user logedin successfully',
    };
  }
}
