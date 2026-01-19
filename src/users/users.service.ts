import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}
  users: {
    id: number;
    name: string;
    age: number;
    gender: string;
    isMarried: boolean;
    password: string;
  }[] = [
    {
      id: 1,
      name: 'john',
      age: 28,
      gender: 'male',
      isMarried: true,
      password: 'abhishek',
    },
    {
      id: 2,
      name: 'abhi',
      age: 22,
      gender: 'male',
      isMarried: false,
      password: 'abhishek',
    },
  ];

  getAllUsers() {
    if (this.authService.isAuthenticated) {
      return this.users;
    }
    return 'you are not logined in';
  }

  getUserById(id: number) {
    return this.users.find((x) => x.id === id);
  }

  createUser(user: {
    id: number;
    name: string;
    age: number;
    gender: string;
    isMarried: boolean;
    password: string;
  }) {
    this.users.push(user);
    console.log(this.users);
  }
}
