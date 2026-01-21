import { IsDate, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateProfileDto {
  @IsString({ message: 'First Name should be a string value' })
  @IsOptional()
  @MinLength(3, {
    message: 'First Name should have a minimum of a 4  characters.',
  })
  firstName?: string;

  @IsString({ message: 'Last Name should be a string value' })
  @IsOptional()
  @MinLength(3, {
    message: 'Last Name should have a minimum of a 4  characters.',
  })
  lastName?: string;

  @IsString()
  @IsOptional()
  gender?: string;

  @IsOptional()
  @IsDate()
  dateOfBirth?: Date;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsString()
  @IsOptional()
  profileImage?: string;
}
