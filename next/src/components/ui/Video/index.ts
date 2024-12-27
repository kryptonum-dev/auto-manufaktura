import Video from './Video';
export type { VideoDataTypes } from './Video.types';
export { VideoLazy } from './VideoLazy';
export default Video;

export const VideoDataQuery = (name: string) => `
  ${name} {
    asset->{
      playbackId,
      "aspectRatio": data.aspect_ratio,
    }
  }
`;
