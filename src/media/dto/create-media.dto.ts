import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { MediaEnum, StatusEnum } from '../enums';

export class CreateMediaDto {
  @IsNotEmpty()
  @IsString({ message: 'name must be a text' })
  @MaxLength(255)
  @MinLength(3)
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsString({ message: 'media type must be a text' })
  @ApiProperty({ enum: MediaEnum })
  type: MediaEnum;

  @IsString({ message: 'description must be a text' })
  @ApiProperty()
  description: string;

  @IsNotEmpty()
  @IsString({ message: 'url must be a text' })
  @MaxLength(255)
  @MinLength(3)
  @ApiProperty()
  url: string;
}
