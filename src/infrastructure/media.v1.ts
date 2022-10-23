import { TUploadableMedia, TwitterApi } from 'twitter-api-v2';
import { config } from '@app/config';

const client = new TwitterApi({
  appKey: config.twitter.apiKey,
  appSecret: config.twitter.apiSecret,
  accessToken: config.twitter.accessToken,
  accessSecret: config.twitter.accessSecret,
});

type UploadedMediaId = string;

export const uploadMediaV1 = async (
  file: TUploadableMedia,
  mimeType: string,
): Promise<UploadedMediaId> => {
  return client.v1.uploadMedia(file, { mimeType });
}