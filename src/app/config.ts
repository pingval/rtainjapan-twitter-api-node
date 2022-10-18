import configModule from 'config';

type CacheConfiguration = {
  ttl: number;
  enabled: boolean;
}

type TwitterConfiguration = {
  apiKey: string;
  apiSecret: string;
  accessToken: string;
  accessSecret: string;
};

export type Configuration = {
  hashtag: string;
  cache: CacheConfiguration;
  twitter: TwitterConfiguration;
}

export const config: Configuration = {
  hashtag: configModule.get('hashtag'),
  cache: {
    ttl: configModule.get('cache.ttl'),
    enabled: configModule.get('cache.enabled'),
  },
  twitter: {
    apiKey: configModule.get('twitter.apiKey'),
    apiSecret: configModule.get('twitter.apiSecret'),
    accessToken: configModule.get('twitter.accessToken'),
    accessSecret: configModule.get('twitter.accessSecret'),
  },
};