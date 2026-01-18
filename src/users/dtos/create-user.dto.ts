import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  id: number;

  @IsString({ message: 'Name chouls be a string value' })
  @IsNotEmpty()
  @MinLength(4, { message: 'Name should have a minimum of a 4  characters.' })
  name: string;

  @IsString()
  @IsOptional()
  gender?: string;

  @IsEmail()
  email: string;

  @IsBoolean()
  isMarried: boolean;
}
