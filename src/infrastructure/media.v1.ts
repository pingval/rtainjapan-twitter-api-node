import { TUploadableMedia, TwitterApi } from 'twitter-api-v2';
import { config } from '@app/config';
import { TwitterError } from './tweets';

const client = new TwitterApi({
  appKey: config.twitter.apiKey,
  appSecret: config.twitter.apiSecret,
  accessToken: config.twitter.accessToken,
  accessSecret: config.twitter.accessSecret,
});

type UploadedMediaId = string;

const wrapCallTwitter = async <T>(callback: () => Promise<T>): Promise<T> => {
  try {
    return await callback();
  } catch (e: any) {
    // eslint-disable-next-line max-len
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    throw new TwitterError(e.data.error || e.message);
  }
}
export const uploadMediaV1 = async (
  file: TUploadableMedia,
  mimeType: string,
): Promise<UploadedMediaId> => {
  return wrapCallTwitter(() => client.v1.uploadMedia(file, { mimeType }));
}