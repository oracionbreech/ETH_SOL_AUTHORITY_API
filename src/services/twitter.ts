// eslint-disable-next-line @typescript-eslint/no-unused-vars
import TwitterLogin from 'twitter-login';

export const twitter = new TwitterLogin({
  consumerKey: process.env.TWITTER_API_KEY,
  consumerSecret: process.env.TWITTER_API_SECRET,
  callbackUrl: 'https://402c-180-191-117-39.ngrok.io/twitter/auth/userToken'
});
