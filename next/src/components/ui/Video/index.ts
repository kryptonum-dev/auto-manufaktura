export { Player } from './Player';
export type { VideoDataTypes } from './Video.types';
import Video from './Video';
export default Video;

export const VideoDataQuery = (name: string) => `
  ${name} {
    asset->{
      playbackId,
      "aspectRatio": data.aspect_ratio,
    }
  }
`;
