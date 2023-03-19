import { MediaEnum } from '../enums';

export const PostMediaSchema = {
  type: 'object',
  properties: {
    name: { type: 'string', example: 'Don jazzy' },
    type: { enum: [MediaEnum], example: 'audio', default: 'image' },
    description: { type: 'string', description: 'search query' },
    url: {
      type: 'string',
      example: 'http://www.music.com/',
    },
  },
};
