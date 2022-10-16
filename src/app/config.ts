import configModule from 'config';

type TwitterConfiguration = {
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
    apiKey: configModule.get('twitter.apiKey'),
    apiSecret: configModule.get('twitter.apiSecret'),
    accessToken: configModule.get('twitter.accessToken'),
    accessSecret: configModule.get('twitter.accessSecret'),
  },
};