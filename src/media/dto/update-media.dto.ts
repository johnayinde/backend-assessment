import { PartialType } from '@nestjs/swagger';
import { CreateMediaDto } from './index';

export class UpdateMediaDto extends PartialType(CreateMediaDto) {}
