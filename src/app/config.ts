import configModule from 'config';

type TwitterConfiguration = {
  timelineUserId: string;
  apiKey: string;
  apiSecret: string;
  accessToken: string;
  accessSecret: string;
};

export type Configuration = {
  twitter: TwitterConfiguration;
}

export const config: Configuration = {
  twitter: {
    timelineUserId: configModule.get('twitter.timeline_user_id'),
    apiKey: configModule.get('twitter.apiKey'),
    apiSecret: configModule.get('twitter.apiSecret'),
    accessToken: configModule.get('twitter.accessToken'),
    accessSecret: configModule.get('twitter.accessSecret'),
  },
};