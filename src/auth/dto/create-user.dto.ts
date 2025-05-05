import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsIn,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    default: 'user@gmail.com',
  })
  @IsEmail()
  userEmail: string;

  @ApiProperty({
    default: '12791000',
  })
  @IsString()
  @MinLength(8)
  userPassword: string;

  @ApiProperty({
    default: 'Employee',
  })
  @IsOptional()
  @IsIn(['Admin', 'Employee', 'Manager'])
  userRoles: string[];
}
