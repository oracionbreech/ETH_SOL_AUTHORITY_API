// eslint-disable-next-line @typescript-eslint/no-unused-vars
import TwitterLogin from 'twitter-login';

export const twitter = new TwitterLogin({
  consumerKey: process.env.TWITTER_API_KEY,
  consumerSecret: process.env.TWITTER_API_SECRET,
  callbackUrl: 'https://4ece-2404-3c00-a830-cc90-6582-52d7-15ea-a0eb.ngrok.io/twitter/auth/userToken'
});
