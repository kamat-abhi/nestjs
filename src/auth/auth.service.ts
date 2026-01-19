import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UserService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  isAuthenticated: boolean = false;

  login(name: string, password: string) {
    const user = this.userService.users.find(
      (u) => u.name === name && u.password === password,
    );
    if (user) {
      this.isAuthenticated = true;
      return 'My_Token';
    }
    return 'User doesnot exist';
  }
}
