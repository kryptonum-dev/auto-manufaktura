import { ImgDataQuery, type ImgDataTypes } from './Img';
import { VideoDataQuery, type VideoDataTypes } from './Video';

export const MediaDataQuery = (name: string) => `
  ${name} {
    type,
    ${ImgDataQuery('image')},
    ${VideoDataQuery('video')}
  }
`;

export type MediaDataTypes =
  | {
      type: 'image';
      image: ImgDataTypes;
      video?: never;
    }
  | {
      type: 'video';
      image?: never;
      video: VideoDataTypes;
    };
