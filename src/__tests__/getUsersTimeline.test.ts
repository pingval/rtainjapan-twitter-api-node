import { getMockTweetsByUser, userTimeline } from '../repositories/mock/tweets';
import request from 'supertest';

const app = require('../app');

jest.mock('../repositories/tweets', () => ({
  getTweetsByUser: jest.fn(getMockTweetsByUser),
}));

test('get user\'s timeline', (done) => {
  
  request(app)
    .get('/statuses/user_timeline')
    .expect(200, {
      code: 0,
      data: userTimeline,
    }, done);

});
