import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReturnedResponse } from 'src/common/helpers/response';
import { Repository } from 'typeorm';
import { CreateMediaDto, UpdateMediaDto } from './dto/index';
import { Media } from './entities/media.entity';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media) private mediaRepository: Repository<Media>,
  ) {}

  /**
   * It creates a media
   * @param {CreateMediaDto} media - media
   * @returns The return type is an object of type Media.
   */

  async create(media: CreateMediaDto): Promise<Media> {
    try {
      let foundMedia = await this.mediaRepository.findOneBy({
        name: media.name,
      });

      if (foundMedia) {
        throw new BadRequestException(
          ReturnedResponse.BadRequest(
            `A media with name ${media.name} already exist`,
          ),
        );
      }
      const createdMedia = this.mediaRepository.create(media);
      return await this.mediaRepository.save(createdMedia);
    } catch (error) {
      console.log(error);

      throw new BadRequestException(ReturnedResponse.BadRequest(error.message));
    }
  }

  /**
   * It get all created medias in paginations
   * @param {number} page - the starting page number
   * @param {number} perPage - perPage - the limit per page
   * @returns The return type is an array of type Media.
   */
  async getAll(page: number, perPage: number) {
    // console.log({ page });

    const results = await this.mediaRepository
      .createQueryBuilder('media')
      .orderBy('media.id', 'ASC')
      .limit(perPage || 10)
      .offset(page || 0)
      .getManyAndCount();

    return { results, count: results[1] };
  }

  /**
   * It takes a query string,and search for the match from the DB
   * @param {string} query - query - This is the query string that is passed to the
   * controller method.
   * @returns it return Array of Media[]
   */
  async search(query: string) {
    const results = await this.mediaRepository
      .createQueryBuilder('media')
      .where('media.name like :name', { name: `%${query}%` })
      .getManyAndCount();

    return { results, count: results[1] };
  }

  /**
   * It get a single media
   * @param {number} id - the unique identification of the media
   * @returns The return an object of type Media.
   */
  async getOneById(id: number): Promise<Media> {
    try {
      let foundMedia = await this.mediaRepository.findOne({
        where: { id: id },
      });

      if (!foundMedia) {
        throw new BadRequestException(
          ReturnedResponse.NotFoundRequest(`Media does not exist`),
        );
      }
      return foundMedia;
    } catch (error) {
      throw new BadRequestException(ReturnedResponse.BadRequest(error.message));
    }
  }

  /**
   * It get a single media from the passed in ID, search for it and update if it exist on the database
   * @param {number} id - the unique identification of the media
   * @param {UpdateMediaDto} media - tThe new update to be made on the existing media
   * @returns The return an object of type Media.
   */
  async update(id: number, media: UpdateMediaDto): Promise<Media> {
    try {
      let foundMedia = await this.mediaRepository.findOne({
        where: { id: id },
      });

      if (!foundMedia) {
        throw new BadRequestException(
          ReturnedResponse.NotFoundRequest(`Media does not exist`),
        );
      }

      return await this.mediaRepository.save({ ...foundMedia, media });
    } catch (error) {
      throw new BadRequestException(ReturnedResponse.BadRequest(error.message));
    }
  }

  /**
   * It get a single media from the passed in ID, search for it and delete if it exist on the database
   * @param {number} id - the unique identification of the media
   * @returns The return an object of type DeleteResult.
   */
  async delete(id: number) {
    try {
      let foundMedia = await this.mediaRepository.findOne({
        where: { id: id },
      });

      if (!foundMedia) {
        throw new BadRequestException(
          ReturnedResponse.NotFoundRequest(`Media does not exist`),
        );
      }

      return await this.mediaRepository.delete(id);
    } catch (error) {
      throw new BadRequestException(ReturnedResponse.BadRequest(error.message));
    }
  }
}
