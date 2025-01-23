'use server';
import { createBlurUp } from '@mux/blurup';

export const getMuxVideoPlaceholder = async (playbackId: string, time: number = 0): Promise<string> => {
  if (!playbackId) return '';
  try {
    const { blurDataURL } = await createBlurUp(playbackId, { time });
    return blurDataURL;
  } catch {
    return '';
  }
};
