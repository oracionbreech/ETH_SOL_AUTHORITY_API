// eslint-disable-next-line @typescript-eslint/no-unused-vars
import TwitterLogin from 'twitter-login';

export const twitter = new TwitterLogin({
  consumerKey: process.env.TWITTER_API_KEY,
  consumerSecret: process.env.TWITTER_API_SECRET,
  callbackUrl: `${process.env.API_BASE_URL}/twitter/auth/userToken`
});
