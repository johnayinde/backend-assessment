import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import { ReturnedResponse } from 'src/common/helpers/response';
import { CreateMediaDto, UpdateMediaDto } from './dto/index';
import { MediaService } from './media.service';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PostMediaSchema } from './dto/annual-result-schema.dto';

@ApiTags('Media')
@Controller('media')
export class MediaController {
  constructor(private mediaService: MediaService) {}

  @Post()
  @ApiBody({
    schema: PostMediaSchema,
  })
  async create(@Body() media: CreateMediaDto) {
    const response = await this.mediaService.create(media);
    console.log(response);

    return ReturnedResponse.Ok(response, 'Media created successuflly.');
  }

  @Get()
  async getAll(
    @Query('page') page?: number,
    @Query('perPage') perPage?: number,
  ) {
    console.log(page, perPage);

    const allMedias = await this.mediaService.getAll(page, perPage);
    return ReturnedResponse.Ok(allMedias, 'OK');
  }

  @ApiQuery({
    schema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'search query' },
      },
    },
  })
  @Get('search')
  async SearchMedia(@Query('query') query?: string) {
    console.log(query);

    const allMedias = await this.mediaService.search(query);
    return ReturnedResponse.Ok(allMedias, 'OK');
  }

  @Get(':id')
  async getOne(@Param('id') id: number) {
    const response = await this.mediaService.getOneById(id);
    return ReturnedResponse.Ok(response, 'Media Retrived successuflly.');
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() media: UpdateMediaDto) {
    const response = await this.mediaService.update(id, media);
    return ReturnedResponse.Ok(response, 'Media Updated successuflly.');
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    const response = await this.mediaService.delete(id);
    return ReturnedResponse.Ok(response, 'Media Deleted successuflly.');
  }
}
