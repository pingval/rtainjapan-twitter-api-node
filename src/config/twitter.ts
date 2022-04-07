import configModule from 'config';

type TwitterConfiguration = {
  bearer: string;
  timelineUserId: string;
};


const config: TwitterConfiguration = {
  bearer: configModule.get('twitter.bearer'),
  timelineUserId: configModule.get('twitter.timeline_user_id'),
};

export default config;