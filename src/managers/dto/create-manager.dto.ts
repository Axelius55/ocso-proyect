import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { Location } from 'src/locations/entities/location.entity';

export class CreateManagerDto {
  @ApiProperty({
    default: 'Luis Axel Herrera Correa',
  })
  @IsString()
  @MaxLength(80)
  managerFullName: string;

  @ApiProperty({
    default: 'manager@gmail.com',
  })
  @IsString()
  @IsEmail()
  managerEmail: string;

  @ApiProperty({
    default: 10500,
  })
  @IsNumber()
  managerSalary: number;

  @ApiProperty({
    default: '1890012923',
  })
  @IsString()
  @MaxLength(16)
  managerPhoneNumber: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  location: Location;
}
