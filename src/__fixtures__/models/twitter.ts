import { Tweet } from '@models/twitter/v2';

/* eslint-disable max-len */

const vanillaTweet: Tweet = {
  id: '1578074395490521088',
  text: 'じゅげむ　じゅげむ　ごこうのすりきれ\\nかいじゃりすいぎょの　すいぎょうまつ\\n\\nうんらいまつ　ふうらいまつ\\n\\nくうねるところに　すむところ\\n\\nやぶらこうじの　ぶらこうじ\\n\\nパイポパイポ\\n\\nパイポのシューリンガン\\n\\nシューリンガンのグーリンダイ\\n\\nグーリンダイのポンポコピーのポンポコナーの\\n\\nちょう',
  user: {
    id: '1543882205264355328',
    username: 'dev_cma',
    name: 'dev-cma',
    profile_image_url: 'https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png',
    created_at: '2022-07-04T09:00:38.000Z'
  },
  created_at: '2022-10-06T17:27:09.000Z'
}

export const makeTweetFixture = (partial: Partial<Tweet>) => ({
  ... vanillaTweet,
  ... partial,
});